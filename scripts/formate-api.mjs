import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// 1. Извлечение пути к артефакту спецификации из .env
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value.trim();
    }
  });
}

const OPENAPI_PATH = process.env.OPENAPI_PATH || '../backend/openapi.json';
const typesPath = './shared/types/api.d.ts';
const constantsPath = './shared/constants/api-endpoints.ts';

/**
 * @typedef {Object} MethodInfo
 * @property {string|null} reqContentType
 * @property {string|null} resContentType
 * @property {string|undefined} successCode
 */

try {
  console.log('Генерация типов из локального артефакта OpenAPI...');

  const generateEnumsObject = () => {
    const schemas = spec.components?.schemas || {};
    return Object.entries(schemas)
      .filter(([_, schema]) => Array.isArray(schema.enum))
      .map(([name, schema]) => `  ${name}: ${JSON.stringify(schema.enum)} as const,`)
      .join('\n');
  };

  // 2. Генерация базовых типов напрямую из локального файла
  execSync(`pnpm exec openapi-typescript "${OPENAPI_PATH}" -o "${typesPath}"`, { stdio: 'inherit' });

  // 3. Чтение и парсинг локального JSON вместо fetch-запроса
  const resolvedOpenapiPath = path.resolve(process.cwd(), OPENAPI_PATH);
  const specContent = fs.readFileSync(resolvedOpenapiPath, 'utf-8');
  const spec = JSON.parse(specContent);
  const paths = Object.keys(spec.paths);

  /** @type {Object.<string, Object.<string, { path: string, methods: Object.<string, MethodInfo> }>>} */
  const grouped = {};

  paths.forEach((path) => {
    const parts = path
      .split('/')
      .filter(Boolean)
      .map((part) => part.replace(/[{}]/g, ''));

    if (parts.length === 0) return;

    const group = parts[0].toUpperCase().replace(/-/g, '_');
    const key = parts.slice(1).join('_').toUpperCase().replace(/-/g, '_') || 'INDEX';

    if (!grouped[group]) grouped[group] = {};

    const methodsInfo = {};

    Object.entries(spec.paths[path]).forEach(([method, detail]) => {
      const m = method.toLowerCase();

      let reqContentType = null;
      if (detail.requestBody?.content) {
        const types = Object.keys(detail.requestBody.content);
        reqContentType = types.includes('application/json')
          ? 'application/json'
          : types.includes('multipart/form-data')
            ? 'multipart/form-data'
            : types[0];
      }

      const successCode = Object.keys(detail.responses || {}).find((code) => code.startsWith('2'));
      let resContentType = null;

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
  import type { components, paths } from '../types/api';
  
  export const API_ENDPOINTS = {
  ${generateEndpointsObject()}
  } as const;
  
  export const API_ENUMS = {
  ${generateEnumsObject()}
  } as const;
  
  export type TApiPayloads = {
  ${generateSchemaTypes()}
  };
  
  export type ApiPath = keyof paths;
  
  export type TypePaginationMeta = components['schemas']['PaginationMetaDto'];
  `.trim();

  fs.writeFileSync(constantsPath, constantsContent);
  console.log(`Файл успешно обновлен в ${constantsPath}`);
} catch (error) {
  console.error('Произошла ошибка при генерации типов:', error.message || error);
  process.exit(1);
}
