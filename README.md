# Cricky

Protea-inspired cricket scoring app built with TanStack Start, TypeScript, Tailwind CSS, Drizzle ORM, and SQLite.

## Local development

```sh
npm install
npm run dev
```

SQLite data is stored in `./data/cricky.sqlite` (or `DATA_DIR`). The app supports live match creation, runs, wickets, wides, no-balls, byes, leg-byes, recent matches, and undo.

## Deployment

Build with `docker build -t cricky .`; persist `/data`. Dokploy should route `cricky.v3ck.com` to container port `3000`.
