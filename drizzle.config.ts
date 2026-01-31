import {defineConfig} from 'drizzle-kit';

export default defineConfig({
  schema: './server/database/schema/index.ts', // Где лежат описания таблиц
  out: './server/database/migrations',   // Куда сохранять историю изменений
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,      // Ссылка из твоего .env
  },
});