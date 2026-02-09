---
title: Setup Guide
---

# Setup Guide

How to set up the Project 1999 Discord bot for local development or production deployment.

## Prerequisites

- **Node.js** 20+
- **npm** (comes with Node.js)
- **PostgreSQL** 14+ with an existing database and schema
- **Discord bot token** with the `Guilds` intent enabled
- (Optional) A local MediaWiki instance for item/spell lookups

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DISCORD_TOKEN` | Bot token from the Discord Developer Portal |
| `BOT_SELF` | Bot's application (client) ID |
| `GUILD_ID` | ID of the Discord server (guild) to register commands in |
| `PGHOST` | PostgreSQL hostname |
| `PGPORT` | PostgreSQL port (default: `5432`) |
| `PGUSER` | Database username |
| `PGPASSWORD` | Database password |
| `POSTGRES_DB` | Database name |

## Database Setup

1. Create a PostgreSQL database.
2. Run the schema from `schema.sql` to create all tables and views.
3. Populate reference tables (`class_definitions`, `races`, `raids`, etc.) with EverQuest data.

The bot uses `synchronize: false` in TypeORM, so it will **not** create or modify tables automatically.

## Local Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run build

# Register slash commands with your guild (run once, or after adding new commands)
npx esrun register_guild_commands.ts

# Start the bot
npm start
```

### Generating Documentation Locally

```bash
# Install docs dependencies (first time only)
cd docs && npm install && cd ..

# Development server with hot reload
npm run docs:dev

# Production build
npm run docs:build
```

## Discord Bot Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a new application (or use an existing one).
3. Under **Bot**, enable the **Guilds** intent.
4. Copy the bot token to your `.env` file.
5. Under **OAuth2 > URL Generator**, select the `bot` and `applications.commands` scopes.
6. Select permissions: `Manage Roles`, `Send Messages`, `Use Slash Commands`, `Embed Links`.
7. Use the generated URL to invite the bot to your server.

## Production Deployment (Railway)

The bot is deployed on [Railway](https://railway.app):

1. Connect your GitHub repository to a Railway project.
2. Set all environment variables in the Railway dashboard.
3. Railway will build with `npm run build` and run with `npm start`.
4. Slash commands are registered separately -- run `register_guild_commands.ts` from a local machine or a Railway one-off command.

## Documentation Deployment (GitHub Pages)

Documentation is automatically built and deployed via GitHub Actions on every push to `main`:

1. Enable **GitHub Pages** in your repository settings.
2. Set the source to **GitHub Actions**.
3. The `.github/workflows/docs.yml` workflow handles building and deploying.
