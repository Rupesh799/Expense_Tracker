import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon("postgresql://expensedb_owner:mD0uWvUb1lxM@ep-morning-block-a5f3ouh0.us-east-2.aws.neon.tech/expensedb?sslmode=require");
export const db = drizzle(sql,{schema});