---
title: Data Models
description: Overview of the PostgreSQL database schema and TypeORM entities.
---

The bot uses PostgreSQL with TypeORM. All entities live in `entities/` and are auto-discovered at startup. The schema breaks into five domains:

| Domain | Tables | Description |
|--------|--------|-------------|
| [Characters](./characters/) | `census`, `active_toons` (view), `status` (view) | Guild member character records |
| [DKP & Raids](./dkp/) | `dkp`, `attendance`, `raids`, `items` | Dragon Kill Points and raid attendance |
| [Bank & Plat](./bank/) | `bank`, `inventory`, `trash`, `plat` | Guild bank inventory and platinum ledger |
| [Game Reference](./reference/) | `class_definitions`, `class_lore`, `class_roles`, `races` | Static EverQuest lookup data |
| [Shared Accounts](./shared-accounts/) | `shared_accounts`, `shared_toons`, `self_roles` | Shared guild accounts and self-assignable roles |

---

### Key Conventions

- **Primary keys** are auto-generated `bigint` columns named `Id` (except `raids`, which uses `Raid` as a text PK).
- **Discord IDs** are stored as `text` — Discord snowflakes exceed JavaScript's `Number.MAX_SAFE_INTEGER`.
- **Timestamps** use `timestamp without time zone` (except `plat`, which uses `with time zone`).
- **Views** (`active_toons`, `status`) are read-only projections of `census` defined via TypeORM's `@ViewEntity`.
- The only foreign-key relationship is `shared_toons` → `shared_accounts` (many-to-one on the `account` column).
