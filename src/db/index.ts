import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import fs from 'node:fs';
fs.mkdirSync(process.env.DATA_DIR || './data',{recursive:true});
const sqlite = new Database(`${process.env.DATA_DIR || './data'}/cricky.sqlite`);
sqlite.pragma('journal_mode = WAL');
sqlite.exec(`CREATE TABLE IF NOT EXISTS matches (id INTEGER PRIMARY KEY AUTOINCREMENT, home TEXT NOT NULL, away TEXT NOT NULL, overs_limit INTEGER NOT NULL DEFAULT 20, status TEXT NOT NULL DEFAULT 'live', created_at INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS balls (id INTEGER PRIMARY KEY AUTOINCREMENT, match_id INTEGER NOT NULL REFERENCES matches(id), runs INTEGER NOT NULL, legal INTEGER NOT NULL, wicket INTEGER NOT NULL DEFAULT 0, kind TEXT NOT NULL DEFAULT 'run', created_at INTEGER NOT NULL);`);
export const db=drizzle(sqlite,{schema});
