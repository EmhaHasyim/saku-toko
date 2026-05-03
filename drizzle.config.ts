import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/server/db/schema/index.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: env.CLOUDFLARE_ACCOUNT_ID,
    databaseId: env.CLOUDFLARE_DATABASE_ID,
    token: env.CLOUDFLARE_D1_TOKEN,
  },
});
