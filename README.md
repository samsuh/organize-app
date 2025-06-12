Organize App helps keep projects organized.

## Tech Stack

- NextJS 15 using App Router
- Typescript
- Postgresql with Prisma ORM
- Docker
- (eventually) Deployed to Vercel

## While in Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional Configuration required to run this project

### Postgres

- run local docker desktop to run postgres
- in .env.local
  - `DATABASE_URL="postgresql://<username>@localhost:5432/<dbname>?schema=public"`
  - add AUTH_SECRET (used by next auth), GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
- start up the postgres instance locally in a separate terminal window using `npm run start:db` while docker is active
