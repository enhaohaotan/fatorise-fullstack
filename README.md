# fatorise-fullstack

Fullstack assessment project with a Node/Express API and an Expo mobile client.

## Stack

- API: Node.js, Express, Prisma, PostgreSQL, Zod, JWT, bcrypt
- Mobile: Expo Router, React Native
- Monorepo: npm workspaces

## Project Structure

- `apps/api` - Express API + Prisma schema/migrations
- `apps/mobile` - Expo mobile app
- `packages/shared` - Shared types/schemas
- `docs/structure.md` - API contract
- `apps/api/src/tests/api.http` - Manual HTTP requests

## Requirements

- Node.js >= 18
- npm
- PostgreSQL

## Setup

1. Install dependencies:

```
npm install
```

2. Configure API env:

```
copy apps\\api\\.env.example apps\\api\\.env
```

Update `DATABASE_URL`, `JWT_SECRET`, and other values as needed.

3. Configure mobile env:

```
copy apps\\mobile\\.env.example apps\\mobile\\.env
```

Set `EXPO_PUBLIC_API_BASE_URL` to your API URL (use your LAN IP when testing on a device).

4. Run Prisma migrations and generate Prisma Client (from repo root):

```
npx prisma migrate dev --schema apps/api/prisma/schema.prisma --config apps/api/prisma.config.ts

npx prisma generate --schema apps/api/prisma/schema.prisma

```

## Run

- API dev server:

```
npm run dev:api
```

- Mobile dev server:

```
npm run dev:mobile
```

## API Docs

See `docs/structure.md` for endpoints and data shapes.

## Manual API Tests

Use `apps/api/src/tests/api.http` in VS Code REST Client to run through the flow.
