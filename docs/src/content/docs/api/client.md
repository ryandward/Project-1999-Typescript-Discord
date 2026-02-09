---
editUrl: false
next: true
prev: true
title: "client"
---

## Variables

### client

> `const` **client**: [`TSClient`](/api/types/#tsclient)

Defined in: [client.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/client.ts#L11)

Singleton Discord client instance used throughout the application.

Configured with the `Guilds` intent, which is sufficient for slash-command
interactions and guild member lookups. Imported by the bootstrap module
(`index.ts`) and all event handlers that need access to the client.
