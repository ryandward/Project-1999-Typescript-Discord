---
title: Architecture
---

# Architecture Overview

This document describes the internal architecture of the Project 1999 Discord bot for developers and contributors.

## Module Diagram

```
index.ts                    <- Entry point: init DB, load commands & events, login
|-- app_data.ts             <- TypeORM DataSource (PostgreSQL)
|-- client.ts               <- Singleton TSClient instance
|-- types.ts                <- Command interface, TSClient class
|
|-- commands/
|   |-- census/             <- Character registration & management
|   |   |-- main.ts, alt.ts, bot.ts   (declare characters)
|   |   |-- ding.ts, drop.ts, change.ts, claim.ts
|   |   |-- toons.ts, whois.ts        (lookup)
|   |   |-- assign.ts, reassign.ts    (officer tools)
|   |   |-- promote.ts                (officer promotion)
|   |   \-- census_functions.ts       (shared helpers)
|   |
|   |-- dkp/                <- Dragon Kill Points
|   |   |-- attendance.ts   (modal-based raid attendance)
|   |   \-- dkp.ts          (balance lookup)
|   |
|   |-- bank/               <- Guild bank management
|   |   |-- find.ts         (item search + request flow)
|   |   |-- browse.ts       (-> actually in utility/)
|   |   |-- expense.ts, income.ts, plat.ts
|   |   \-- item_functions.ts (MediaWiki integration)
|   |
|   \-- utility/            <- Roles, accounts, shared toons, misc
|       |-- login.ts, account.ts, browse.ts, listaccounts.ts
|       |-- add.ts, remove.ts, roles.ts, create_role.ts
|       |-- note.ts, delete_shared_toon.ts
|       |-- help.ts, ping.ts, permissions.ts
|       \-- utility_functions.ts
|
|-- events/
|   |-- ready.ts                  <- ClientReady: log in + start promotion timer
|   |-- interaction_create.ts     <- Central router for commands/autocomplete/modals
|   \-- check_for_promotions.ts   <- Scheduled daily promotion check
|
|-- entities/               <- TypeORM entity classes (1:1 with DB tables/views)
|   |-- Census.ts, ActiveToons.ts, Dkp.ts, Bank.ts, ...
|   \-- SharedModels.ts     (SharedAccounts + SharedToons in one file)
|
|-- services/
|   \-- role_manager.ts     <- DiscordRoleManager helper class
|
\-- register_guild_commands.ts  <- Standalone script to push commands to Discord API
```

## Command Contract

Every command module in `commands/` must export an object satisfying the `Command` interface from `types.ts`:

```typescript
interface Command {
  data: SlashCommandBuilder;           // Required -- slash command definition
  execute?(interaction): Promise<void>; // Required -- handler
  autocomplete?(interaction): Promise<void>; // Optional
  handleModal?(interaction): Promise<void>;  // Optional (only attendance uses this)
}
```

The entry point (`index.ts`) dynamically imports every `.js` file under `commands/<category>/` and registers it on `client.commands` if it has both `data` and `execute`.

## Event System

Events are loaded from `events/*.js`. Each module exports:

- `name` -- the Discord.js event name (e.g., `Events.InteractionCreate`)
- `once` -- (optional) if `true`, listener fires only once
- `execute()` -- the handler function

The `interaction_create` event is the central router that dispatches to `command.execute()`, `command.autocomplete()`, or `command.handleModal()` based on interaction type.

## Database Architecture

The bot uses PostgreSQL via TypeORM with these main tables:

| Table | Entity | Purpose |
|-------|--------|---------|
| `census` | `Census` | Character records (name, class, level, status, owner) |
| `dkp` | `Dkp` | Per-member DKP balances |
| `attendance` | `Attendance` | Raid attendance records |
| `raids` | `Raids` | Raid definitions with DKP modifiers |
| `bank` | `Bank` | Guild bank inventory |
| `items` | `Items` | Loot award history |
| `plat` | `Plat` | Platinum transaction ledger |
| `shared_accounts` | `SharedAccounts` | Shared guild EQ accounts |
| `shared_toons` | `SharedToons` | Characters on shared accounts |
| `class_definitions` | `ClassDefinitions` | EQ class/title/level mappings |
| `class_lore` | `ClassLore` | Class flavour text |
| `class_roles` | `ClassRoles` | EQ class to Discord role mapping |
| `self_roles` | `SelfRoles` | Self-assignable Discord roles |
| `races` | `Races` | Valid EQ races |
| `trash` | `Trash` | Items filtered from bank imports |
| `inventory` | `Inventory` | Character inventory snapshots |

**Views:**
- `ActiveToons` -- `SELECT * FROM census WHERE status != 'Dropped'`
- `Status` -- `SELECT DISTINCT status FROM census`

Schema synchronisation is disabled (`synchronize: false`). Migrations are managed externally.

## Bot Lifecycle

1. `dotenv/config` loads environment variables
2. `initializeDataSource()` connects to PostgreSQL
3. Command modules are dynamically imported and registered
4. Event handlers are dynamically imported and attached
5. `client.login(token)` connects to Discord
6. On `ClientReady`, the promotion check runs immediately and then every 24 hours

## Hardcoded Channel IDs

| ID | Purpose |
|----|---------|
| `884164383498965042` | Census announcements channel (new members, promotion reminders) |
| `851549677815070751` | General channel (promotion congratulations) |
| `1213309735886000159` | Bank request channel (item requests from `/find`) |
