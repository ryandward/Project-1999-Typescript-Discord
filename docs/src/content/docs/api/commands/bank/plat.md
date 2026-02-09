---
editUrl: false
next: true
prev: true
title: "commands/bank/plat"
---

`/plat` command — displays or adjusts the guild platinum balance.

Without arguments, shows the current total. With an `amount` argument
(requires `ManageGuild`), sets the balance to that value by inserting
a corrective `Plat` transaction.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/bank/plat.ts:16](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/plat.ts#L16)

***

### permissions

> `const` **permissions**: `"ManageGuild"` = `'ManageGuild'`

Defined in: [commands/bank/plat.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/plat.ts#L14)

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/bank/plat.ts:23](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/plat.ts#L23)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
