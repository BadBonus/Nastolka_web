/**
 * @file Скрипт для автоматической генерации TypeScript типов и констант эндпоинтов из OpenAPI/Swagger спецификации.
 * Извлекает спецификацию, группирует пути по контроллерам и формирует типы запросов/ответов с учетом Content-Type.
 */

import { execSync } from 'child_process';
import fs from 'fs';

const apiUrl = process.env.API_URL || 'http://localhost:4000';
const typesPath = './shared/types/api.d.ts';
const constantsPath = './shared/constants/api-endpoints.ts';
const SWAGGER_PATH = '/api/docs-json';

/**
 * @typedef {Object} MethodInfo
 * @property {string|null} reqContentType - Формат данных запроса.
 * @property {string|null} resContentType - Формат данных ответа.
 * @property {string|undefined} successCode - HTTP код успешного ответа (2xx).
 */

try {
  console.log('Генерация типов из Swagger...');
  execSync(`pnpm exec openapi-typescript ${apiUrl}${SWAGGER_PATH} -o ${typesPath}`, { stdio: 'inherit' });

  const response = await fetch(`${apiUrl}${SWAGGER_PATH}`);
  const spec = await response.json();
  const paths = Object.keys(spec.paths);

  /** @type {Object.<string, Object.<string, { path: string, methods: Object.<string, MethodInfo> }>>} */
  const grouped = {};

  // Группировка путей спецификации по неймспейсам (контроллерам)
  paths.forEach((path) => {
    const parts = path
      .split('/')
      .filter(Boolean)
      .map((part) => part.replace(/[{}]/g, ''));

    if (parts.length === 0) return;

    // Определение группы (например, AUTH) и ключа (например, REGISTER)
    const group = parts[0].toUpperCase().replace(/-/g, '_');
    const key = parts.slice(1).join('_').toUpperCase().replace(/-/g, '_') || 'INDEX';

    if (!grouped[group]) grouped[group] = {};

    const methodsInfo = {};

    // Обход всех HTTP-методов (get, post, patch и т.д.) для текущего пути
    Object.entries(spec.paths[path]).forEach(([method, detail]) => {
      const m = method.toLowerCase();

      let reqContentType = null;
      // Определение приоритетного Content-Type для тела запроса
      if (detail.requestBody?.content) {
        const types = Object.keys(detail.requestBody.content);
        reqContentType = types.includes('application/json')
          ? 'application/json'
          : types.includes('multipart/form-data')
            ? 'multipart/form-data'
            : types[0];
      }

      // Поиск первого успешного HTTP-статуса (начинается с '2')
      const successCode = Object.keys(detail.responses || {}).find((code) => code.startsWith('2'));
      let resContentType = null;

      // Определение приоритетного Content-Type для тела ответа
      if (successCode && detail.responses[successCode]?.content) {
        const types = Object.keys(detail.responses[successCode].content);
        resContentType = types.includes('application/json')
          ? 'application/json'
          : types.includes('multipart/form-data')
            ? 'multipart/form-data'
            : types[0];
      }

      methodsInfo[m] = { reqContentType, resContentType, successCode };
    });

    grouped[group][key] = {
      path,
      methods: methodsInfo,
    };
  });

  /**
   * Формирует строковое представление объекта API_ENDPOINTS.
   * Очищает пути от динамических параметров Swagger (/{id}) для использования на клиенте.
   * @returns {string} Исходный код объекта констант маршрутов.
   */
  const generateEndpointsObject = () => {
    return Object.entries(grouped)
      .map(([group, items]) => {
        const entries = Object.entries(items)
          .map(([key, info]) => {
            const cleanPath = info.path.replace(/\/{[^}]+}$/, '/');
            return `    ${key}: "${cleanPath}",`;
          })
          .join('\n');
        return `  ${group}: {\n${entries}\n  },`;
      })
      .join('\n');
  };

  /**
   * Формирует строковое представление типа TApiPayloads.
   * Связывает пути и методы с соответствующими типами request и response из сгенерированного api.d.ts.
   * @returns {string} Исходный код объявления типа полезной нагрузки API.
   */
  const generateSchemaTypes = () => {
    return Object.entries(grouped)
      .map(([group, items]) => {
        const entries = Object.entries(items)
          .map(([key, info]) => {
            const methodTypes = Object.entries(info.methods)
              .map(([m, details]) => {
                const methodUpper = m.toUpperCase();

                const reqTypeLine = details.reqContentType
                  ? `req: paths["${info.path}"]["${m}"]["requestBody"]["content"]["${details.reqContentType}"];`
                  : 'req?: never;';

                const resTypeLine = details.resContentType
                  ? `res: paths["${info.path}"]["${m}"]["responses"]["${details.successCode}"]["content"]["${details.resContentType}"];`
                  : 'res?: void;';

                return `      ${methodUpper}: {
        ${reqTypeLine}
        ${resTypeLine}
      };`;
              })
              .join('\n');

            return `    ${key}: {\n${methodTypes}\n    };`;
          })
          .join('\n');

        return `  ${group}: {\n${entries}\n  };`;
      })
      .join('\n');
  };

  const constantsContent = `
import type { paths } from '../types/api';

export const API_ENDPOINTS = {
${generateEndpointsObject()}
} as const;

export type TApiPayloads = {
${generateSchemaTypes()}
};

export type ApiPath = keyof paths;
`.trim();

  fs.writeFileSync(constantsPath, constantsContent);
  console.log(`Файл успешно обновлен в ${constantsPath}`);
} catch (error) {
  const errorText = String(error?.stderr || error?.message || error);
  const isConnRefused = errorText.includes('ECONNREFUSED') || error?.cause?.code === 'ECONNREFUSED';

  if (isConnRefused) {
    console.error(`Сервер недоступен по адресу ${apiUrl}. Проверьте работу сервера.`);
  } else {
    console.error('Произошла ошибка при генерации типов', error);
  }
  process.exit(1);
}
