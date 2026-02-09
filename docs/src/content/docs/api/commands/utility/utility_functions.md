---
editUrl: false
next: true
prev: true
title: "commands/utility/utility_functions"
---

Shared helper functions for utility commands.

Currently houses the [loginLogic](#loginlogic) function that powers the `/login`
command's three-branch flow: create toon, update toon, or display account info.

## Functions

### loginLogic()

> **loginLogic**(`interaction`, `toonName`, `accountName?`): `Promise`\<`void`\>

Defined in: [commands/utility/utility\_functions.ts:31](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/utility_functions.ts#L31)

Core logic for the `/login` command with three branches:

1. **Toon doesn't exist + account provided** → creates the toon and links it.
2. **Toon exists + account provided** → updates the toon's account link (Officer only).
3. **Toon exists, no account** → displays the account credentials (role-gated).

#### Parameters

##### interaction

The command or button interaction that triggered this.

`CommandInteraction`\<`CacheType`\> | `ButtonInteraction`\<`CacheType`\>

##### toonName

`string`

Name of the shared character to look up or create.

##### accountName?

`string`

Optional account name; if provided, creates/updates the link.

#### Returns

`Promise`\<`void`\>

#### Throws

If the member lacks permission or the referenced entities don't exist.
