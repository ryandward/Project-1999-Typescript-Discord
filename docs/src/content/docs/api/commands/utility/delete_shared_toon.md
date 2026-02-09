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

Defined in: [commands/utility/delete\_shared\_toon.ts:20](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/delete_shared_toon.ts#L20)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/delete\_shared\_toon.ts:31](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/delete_shared_toon.ts#L31)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/delete\_shared\_toon.ts:60](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/delete_shared_toon.ts#L60)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
