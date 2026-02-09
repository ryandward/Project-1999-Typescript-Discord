---
editUrl: false
next: true
prev: true
title: "commands/census/claim"
---

`/claim` command — transfers ownership of a bot character to the invoker.

Only characters with status `"Bot"` are claimable. Autocomplete searches by
both character name and class, sorted by level descending.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/claim.ts:20](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/claim.ts#L20)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/census/claim.ts:32](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/claim.ts#L32)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/claim.ts:66](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/claim.ts#L66)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>
