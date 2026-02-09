---
editUrl: false
next: true
prev: true
title: "commands/utility/delete_shared_toon"
---

`/delete_shared_toon` command — permanently removes a shared toon entry.

Requires the Officer role. Used to clean up typos or obsolete entries
from the `SharedToons` table.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/utility/delete\_shared\_toon.ts:20](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/utility/delete_shared_toon.ts#L20)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/delete\_shared\_toon.ts:31](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/utility/delete_shared_toon.ts#L31)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/delete\_shared\_toon.ts:60](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/utility/delete_shared_toon.ts#L60)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
