import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "../server.js";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import fs from "node:fs";
import { desc, eq } from "drizzle-orm";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
// src/db/schema.ts
var schema_exports = /* @__PURE__ */ __exportAll({
	balls: () => balls,
	matches: () => matches
});
var matches = sqliteTable("matches", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	home: text("home").notNull(),
	away: text("away").notNull(),
	oversLimit: integer("overs_limit").notNull().default(20),
	status: text("status").notNull().default("live"),
	createdAt: integer("created_at").notNull()
});
var balls = sqliteTable("balls", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	matchId: integer("match_id").notNull().references(() => matches.id),
	runs: integer("runs").notNull(),
	legal: integer("legal").notNull(),
	wicket: integer("wicket").notNull().default(0),
	kind: text("kind").notNull().default("run"),
	createdAt: integer("created_at").notNull()
});
// src/db/index.ts
fs.mkdirSync(process.env.DATA_DIR || "./data", { recursive: true });
var sqlite = new Database(`${process.env.DATA_DIR || "./data"}/cricky.sqlite`);
sqlite.pragma("journal_mode = WAL");
sqlite.exec(`CREATE TABLE IF NOT EXISTS matches (id INTEGER PRIMARY KEY AUTOINCREMENT, home TEXT NOT NULL, away TEXT NOT NULL, overs_limit INTEGER NOT NULL DEFAULT 20, status TEXT NOT NULL DEFAULT 'live', created_at INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS balls (id INTEGER PRIMARY KEY AUTOINCREMENT, match_id INTEGER NOT NULL REFERENCES matches(id), runs INTEGER NOT NULL, legal INTEGER NOT NULL, wicket INTEGER NOT NULL DEFAULT 0, kind TEXT NOT NULL DEFAULT 'run', created_at INTEGER NOT NULL);`);
var db = drizzle(sqlite, { schema: schema_exports });
// src/routes/index.tsx?tss-serverfn-split
var load_createServerFn_handler = createServerRpc({
	id: "3814e0a9d7c3d0cde0c9bca5fa5ada164f541069e9601e37f9836155659cee02",
	name: "load",
	filename: "src/routes/index.tsx"
}, (opts) => load.__executeServer(opts));
var load = createServerFn({ method: "GET" }).handler(load_createServerFn_handler, async () => ({ matches: db.select().from(matches).orderBy(desc(matches.id)).all() }));
var makeMatch_createServerFn_handler = createServerRpc({
	id: "c813f3fbac0e4d9a3660c1634d43180819f6b6bc6ef5a36ab7a121a8f3f1ce9e",
	name: "makeMatch",
	filename: "src/routes/index.tsx"
}, (opts) => makeMatch.__executeServer(opts));
var makeMatch = createServerFn({ method: "POST" }).validator((v) => v).handler(makeMatch_createServerFn_handler, async ({ data }) => {
	return db.insert(matches).values({
		home: data.home,
		away: data.away,
		oversLimit: data.overs,
		createdAt: Date.now()
	}).returning().get();
});
var score_createServerFn_handler = createServerRpc({
	id: "3f94a8930ad53777c2936e8f3e8df3247373dd2b1f99b9997b4bc71b470fa64d",
	name: "score",
	filename: "src/routes/index.tsx"
}, (opts) => score.__executeServer(opts));
var score = createServerFn({ method: "POST" }).validator((v) => v).handler(score_createServerFn_handler, async ({ data }) => {
	db.insert(balls).values({
		matchId: data.id,
		runs: data.runs,
		legal: data.legal,
		wicket: data.wicket,
		kind: data.kind,
		createdAt: Date.now()
	}).run();
	return true;
});
var undo_createServerFn_handler = createServerRpc({
	id: "cb6de2242eb8a4fd0012fbf4bd5d3abedb1d932773b677b8622327e7c52ca6d2",
	name: "undo",
	filename: "src/routes/index.tsx"
}, (opts) => undo.__executeServer(opts));
var undo = createServerFn({ method: "POST" }).validator((v) => v).handler(undo_createServerFn_handler, async ({ data }) => {
	const last = db.select().from(balls).where(eq(balls.matchId, data.id)).orderBy(desc(balls.id)).get();
	if (last) db.delete(balls).where(eq(balls.id, last.id)).run();
	return true;
});
export { load_createServerFn_handler, makeMatch_createServerFn_handler, score_createServerFn_handler, __exportAll as t, undo_createServerFn_handler };
