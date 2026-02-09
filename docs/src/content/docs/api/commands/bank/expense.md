---
editUrl: false
next: true
prev: true
title: "commands/bank/expense"
---

`/expense` command — records a guild bank expense (platinum withdrawal).

Requires `ManageGuild` permission. Creates a `Plat` record with a
negative amount. Displays a red embed confirming the transaction.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/bank/expense.ts:15](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/expense.ts#L15)

***

### permissions

> `const` **permissions**: `"ManageGuild"` = `'ManageGuild'`

Defined in: [commands/bank/expense.ts:13](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/expense.ts#L13)

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/bank/expense.ts:29](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/expense.ts#L29)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
