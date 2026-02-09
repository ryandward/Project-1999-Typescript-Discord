---
editUrl: false
next: true
prev: true
title: "commands/bank/income"
---

`/income` command — records a guild bank income (platinum deposit).

Requires `ManageGuild` permission. Creates a `Plat` record with a
positive amount. Displays a green embed confirming the transaction.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/bank/income.ts:20](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/bank/income.ts#L20)

***

### permissions

> `const` **permissions**: `"ManageGuild"` = `'ManageGuild'`

Defined in: [commands/bank/income.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/bank/income.ts#L18)

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/bank/income.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/bank/income.ts#L34)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
