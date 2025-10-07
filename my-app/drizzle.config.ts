import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import path from 'node:path';

const schemaAbs = path.join(process.cwd(), 'src', 'db', 'schema.ts').replace(/\\/g, '/');
const outAbs    = path.join(process.cwd(), 'migrations'); // new clean folder

export default defineConfig({
  schema: [schemaAbs],         // array + normalized POSIX path
  out: outAbs,
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
  strict: true,
  verbose: true,
});
