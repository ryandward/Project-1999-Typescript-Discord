---
editUrl: false
next: true
prev: true
title: "client"
---

## Variables

### client

> `const` **client**: [`TSClient`](/api/types/#tsclient)

Defined in: [client.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/client.ts#L11)

Singleton Discord client instance used throughout the application.

Configured with the `Guilds` intent, which is sufficient for slash-command
interactions and guild member lookups. Imported by the bootstrap module
(`index.ts`) and all event handlers that need access to the client.
