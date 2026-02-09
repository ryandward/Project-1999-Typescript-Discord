---
editUrl: false
next: true
prev: true
title: "commands/utility/account"
---

`/account` command — officer tool to view or update shared account credentials.

Requires the Officer role. Can retrieve account details, update the
password, or change the required role for accessing the account.
Creates new accounts if they don't exist when updating.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/utility/account.ts:24](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/account.ts#L24)

***

### permissions

> `const` **permissions**: `string`[]

Defined in: [commands/utility/account.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/account.ts#L22)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/account.ts:37](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/account.ts#L37)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/account.ts:66](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/account.ts#L66)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
