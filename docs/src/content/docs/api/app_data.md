---
editUrl: false
next: true
prev: true
title: "app_data"
---

## Variables

### AppDataSource

> `const` **AppDataSource**: `DataSource`

Defined in: [app\_data.ts:19](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/app_data.ts#L19)

TypeORM `DataSource` configured for the guild's PostgreSQL database.

Connection parameters are read from environment variables:
- `PGHOST` — database hostname
- `PGPORT` — database port
- `PGUSER` — database user
- `PGPASSWORD` — database password
- `POSTGRES_DB` — database name

Entity classes are discovered via the glob `./entities/*.js`.
Schema synchronisation is **disabled** — migrations are managed externally.

## Functions

### initializeDataSource()

> **initializeDataSource**(): `Promise`\<`void`\>

Defined in: [app\_data.ts:39](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/app_data.ts#L39)

Initialises the [AppDataSource](/api/app_data/#appdatasource) connection pool.

Called once at application startup from `index.ts`.
On failure the process exits with code 1 so Railway restarts it.

#### Returns

`Promise`\<`void`\>
