---
editUrl: false
next: true
prev: true
title: "commands/utility/note"
---

`/note` command — adds or clears notes on a shared character.

Requires the Officer role. Notes appear in the `/browse` display
below the character name. Pass an empty notes value to clear.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/utility/note.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/note.ts#L22)

***

### permissions

> `const` **permissions**: `string`[]

Defined in: [commands/utility/note.ts:20](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/note.ts#L20)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/note.ts:35](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/note.ts#L35)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/note.ts:64](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/note.ts#L64)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
