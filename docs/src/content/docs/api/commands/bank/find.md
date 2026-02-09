---
editUrl: false
next: true
prev: true
title: "commands/bank/find"
---

`/find` command — searches the guild bank for items and supports requesting them.

Autocomplete shows matching items with quantities. After finding an item,
members can click "Request" to choose which of their characters needs it,
sending a request notification to the bank request channel (`1213309735886000159`).

Uses interactive button and select-menu collectors for the request flow.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/bank/find.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/bank/find.ts#L30)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/bank/find.ts:41](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/bank/find.ts#L41)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/bank/find.ts:72](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/bank/find.ts#L72)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
