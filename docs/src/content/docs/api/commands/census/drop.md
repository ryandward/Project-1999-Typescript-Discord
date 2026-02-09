---
editUrl: false
next: true
prev: true
title: "commands/census/drop"
---

`/drop` command — soft-deletes a character by setting its status to `"Dropped"`.

The record remains in the `Census` table but is excluded from the
`ActiveToons` view. Autocomplete only shows the invoker's own characters.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/drop.ts:20](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/census/drop.ts#L20)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/census/drop.ts:32](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/census/drop.ts#L32)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/drop.ts:55](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/census/drop.ts#L55)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>
