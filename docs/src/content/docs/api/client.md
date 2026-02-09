---
editUrl: false
next: true
prev: true
title: "client"
---

## Variables

### client

> `const` **client**: [`TSClient`](/Project-1999-Typescript-Discord/api/types/#tsclient)

Defined in: [client.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/client.ts#L11)

Singleton Discord client instance used throughout the application.

Configured with the `Guilds` intent, which is sufficient for slash-command
interactions and guild member lookups. Imported by the bootstrap module
(`index.ts`) and all event handlers that need access to the client.
