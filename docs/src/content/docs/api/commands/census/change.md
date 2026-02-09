---
editUrl: false
next: true
prev: true
title: "commands/census/change"
---

`/change` command — changes a character's status (Main, Alt, Bot).

Enforces business rules: promoting to `"Main"` demotes existing mains to
`"Alt"`, and demoting from `"Main"` is blocked if it's the user's only main.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/change.ts:25](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/change.ts#L25)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/census/change.ts:44](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/change.ts#L44)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/change.ts:67](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/change.ts#L67)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>
