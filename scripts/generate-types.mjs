import { execSync } from "child_process";
import fs from "fs";

const apiUrl = process.env.API_URL || "http://localhost:4000";
const typesPath = "./shared/types/api.d.ts";
const constantsPath = "./shared/constants/api-endpoints.ts";

try {
  console.log("Генерация типов из Swagger...");
  execSync(
    `pnpm exec openapi-typescript ${apiUrl}/api/docs-json -o ${typesPath}`,
    { stdio: "inherit" },
  );

  const response = await fetch(`${apiUrl}/api/docs-json`);
  const spec = await response.json();
  const paths = Object.keys(spec.paths);

  const grouped = {};

  paths.forEach((path) => {
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 0) return;

    const group = parts[0].toUpperCase().replace(/-/g, "_");
    const key =
      parts.slice(1).join("_").toUpperCase().replace(/-/g, "_") || "INDEX";

    if (!grouped[group]) grouped[group] = {};

    const methodsInfo = {};
    Object.entries(spec.paths[path]).forEach(([method, detail]) => {
      const m = method.toLowerCase();
      const hasReq = !!detail.requestBody;
      const successCode = Object.keys(detail.responses).find((code) =>
        code.startsWith("2"),
      );
      const hasRes = !!detail.responses[successCode]?.content;

      methodsInfo[m] = { hasReq, hasRes, successCode };
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
          .map(([key, info]) => `    ${key}: "${info.path}",`)
          .join("\n");
        return `  ${group}: {\n${entries}\n  },`;
      })
      .join("\n");
  };

  const generateSchemaTypes = () => {
    return Object.entries(grouped)
      .map(([group, items]) => {
        const entries = Object.entries(items)
          .map(([key, info]) => {
            const methodTypes = Object.entries(info.methods)
              .map(([m, details]) => {
                const methodUpper = m.toUpperCase();

                const reqTypeLine = details.hasReq
                  ? `req: paths["${info.path}"]["${m}"]["requestBody"]["content"]["application/json"];`
                  : "req?: never;";

                const resTypeLine = details.hasRes
                  ? `res: paths["${info.path}"]["${m}"]["responses"]["${details.successCode}"]["content"]["application/json"];`
                  : "res?: void;";

                return `      ${methodUpper}: { 
        ${reqTypeLine}
        ${resTypeLine}
      };`;
              })
              .join("\n");

            return `    ${key}: {\n${methodTypes}\n    };`;
          })
          .join("\n");

        return `  ${group}: {\n${entries}\n  };`;
      })
      .join("\n");
  };

  const constantsContent = `
import type { paths } from '../types/api';

export const API_ENDPOINTS = {
${generateEndpointsObject()}
} as const;

export type ApiPayloads = {
${generateSchemaTypes()}
};

export type ApiPath = keyof paths;
`.trim();

  fs.writeFileSync(constantsPath, constantsContent);
  console.log(`Файл успешно обновлен в ${constantsPath}`);
} catch (error) {
  console.error("Ошибка генерации");
  process.exit(1);
}
