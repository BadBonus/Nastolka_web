import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const OPENAPI_PATH = process.env.OPENAPI_PATH || '../backend/openapi.json';
const OUTPUT_PATH = './shared/api/types.d.ts';

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

execSync(`pnpm exec openapi-typescript "${OPENAPI_PATH}" -o "${OUTPUT_PATH}"`, {
  stdio: 'inherit',
});
