---
editUrl: false
next: true
prev: true
title: "commands/census/ding"
---

`/ding` command — increments or sets a character's level.

If no level is provided, increments by 1. Autocomplete suggests characters
owned by the invoking user. Only the character's owner can ding their own toons.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/ding.ts:21](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/census/ding.ts#L21)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/census/ding.ts:41](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/census/ding.ts#L41)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/ding.ts:64](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/census/ding.ts#L64)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>
