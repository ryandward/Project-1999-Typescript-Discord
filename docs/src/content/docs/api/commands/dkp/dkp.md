---
editUrl: false
next: true
prev: true
title: "commands/dkp/dkp"
---

`/dkp` command — displays a user's DKP (Dragon Kill Points) balance.

Supports lookup by Discord `@user` mention, character name (autocomplete),
or defaults to the invoker. Shows current DKP (earned - spent) and
total earned in an embed.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/dkp/dkp.ts:23](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/dkp/dkp.ts#L23)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/dkp/dkp.ts:33](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/dkp/dkp.ts#L33)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/dkp/dkp.ts:54](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/dkp/dkp.ts#L54)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>
