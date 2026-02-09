---
editUrl: false
next: true
prev: true
title: "client"
---

## Variables

### client

> `const` **client**: [`TSClient`](../types/#tsclient)

Defined in: [client.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/client.ts#L11)

Singleton Discord client instance used throughout the application.

Configured with the `Guilds` intent, which is sufficient for slash-command
interactions and guild member lookups. Imported by the bootstrap module
(`index.ts`) and all event handlers that need access to the client.
