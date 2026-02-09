---
editUrl: false
next: true
prev: true
title: "app_data"
---

## Variables

### AppDataSource

> `const` **AppDataSource**: `DataSource`

Defined in: [app\_data.ts:19](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/app_data.ts#L19)

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

Defined in: [app\_data.ts:39](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/app_data.ts#L39)

Initialises the [AppDataSource](/Project-1999-Typescript-Discord/api/app_data/#appdatasource) connection pool.

Called once at application startup from `index.ts`.
On failure the process exits with code 1 so Railway restarts it.

#### Returns

`Promise`\<`void`\>
