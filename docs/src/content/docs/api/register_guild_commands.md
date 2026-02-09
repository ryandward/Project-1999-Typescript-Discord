---
editUrl: false
next: true
prev: true
title: "register_guild_commands"
---

Standalone script that registers all slash commands with a specific Discord guild.

**Usage:** `npx esrun register_guild_commands.ts`

Reads every command module from `commands/<category>/*.js`, serialises
them to JSON, and PUTs the full set to the Discord REST API using
`Routes.applicationGuildCommands`. This is **guild-scoped** registration
(instant updates) rather than global registration (up to 1-hour propagation).

Required environment variables: `DISCORD_TOKEN`, `BOT_SELF`, `GUILD_ID`.
