import { defineConfig } from 'drizzle-kit';
export default defineConfig({schema:'./src/db/schema.ts',dialect:'sqlite',dbCredentials:{url:process.env.DATA_DIR?`${process.env.DATA_DIR}/cricky.sqlite`:'./data/cricky.sqlite'}});
