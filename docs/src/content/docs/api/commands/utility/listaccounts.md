---
editUrl: false
next: true
prev: true
title: "commands/utility/listaccounts"
---

`/listaccounts` command — sends the officer a DM with all accessible shared accounts.

Requires the Officer role. Filters accounts by the officer's role hierarchy,
generates a plain-text file listing each account with password, role, and
toons, and sends it via direct message. Logs access in a follow-up.

## Variables

### data

> `const` **data**: `SlashCommandBuilder`

Defined in: [commands/utility/listaccounts.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/listaccounts.ts#L26)

***

### permissions

> `const` **permissions**: `string`[]

Defined in: [commands/utility/listaccounts.ts:24](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/listaccounts.ts#L24)

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/listaccounts.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/listaccounts.ts#L30)

#### Parameters

##### interaction

`CommandInteraction`

#### Returns

`Promise`\<`void`\>
