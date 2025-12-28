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

## UI Screenshots

<figure>
  <img src="docs/screenshots/create-task-modal.png" alt="Create task modal" style="width:50%;">
  <figcaption>Create task modal</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/edit-task-modal.png" alt="Edit task modal" style="width:50%;">
  <figcaption>Edit task modal</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/signin-modal.png" alt="Sign in modal" style="width:50%;">
  <figcaption>Sign in modal</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/signin-signup-screen.png" alt="Sign in and sign up screen" style="width:50%;">
  <figcaption>Sign in and sign up screen</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/signin-with-loading-icon.png" alt="Sign in with loading icon" style="width:50%;">
  <figcaption>Sign in with loading icon</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/signin-with-validation-error.png" alt="Sign in with validation error" style="width:50%;">
  <figcaption>Sign in with validation error</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/signup-modal.png" alt="Sign up modal" style="width:50%;">
  <figcaption>Sign up modal</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/signup-with-validation-error.png" alt="Sign up with validation error" style="width:50%;">
  <figcaption>Sign up with validation error</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/task-list-screen.png" alt="Task list screen" style="width:50%;">
  <figcaption>Task list screen</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/task-list-with-completed-udpate.png" alt="Task list with completed update" style="width:50%;">
  <figcaption>Task list with completed update</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/unified-error-screen.png" alt="Unified error screen" style="width:50%;">
  <figcaption>Unified error screen</figcaption>
</figure>
<figure>
  <img src="docs/screenshots/user-profil-screen-with-signout.png" alt="User profile screen with sign out" style="width:50%;">
  <figcaption>User profile screen with sign out</figcaption>
</figure>
