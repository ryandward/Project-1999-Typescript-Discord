---
editUrl: false
next: true
prev: true
title: "commands/census/promote"
---

`/promote` command — elevates a user from "Probationary Member" to full "Member".

Requires `ManageGuild` permission. Autocomplete shows only users who
currently have the "Probationary Member" role. On promotion, removes the
probationary role, adds the "Member" role, and posts a congratulations
message to the general channel (`851549677815070751`).

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/promote.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/promote.ts#L22)

***

### permissions

> `const` **permissions**: `string`[]

Defined in: [commands/census/promote.ts:20](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/promote.ts#L20)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/census/promote.ts:33](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/promote.ts#L33)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/promote.ts:64](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/promote.ts#L64)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>
