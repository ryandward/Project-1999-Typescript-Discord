---
editUrl: false
next: true
prev: true
title: "index"
---

Application entry point for the Ex Astra Discord bot.

**Startup sequence:**
1. Loads environment variables via `dotenv/config`.
2. Initialises the PostgreSQL connection (`initializeDataSource`).
3. Dynamically imports every command module from `commands/<category>/*.js`
   and registers it on the `client`.
4. Dynamically imports every event handler from `events/*.js`.
5. Logs the client in with `DISCORD_TOKEN`.
