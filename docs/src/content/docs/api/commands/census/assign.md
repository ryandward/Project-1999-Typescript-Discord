---
editUrl: false
next: true
prev: true
title: "commands/census/assign"
---

`/assign` command — officer tool to create and assign a character to any Discord user.

Requires `ManageGuild` permission. Creates a new `Census` record for
the specified user. If the user is new, automatically inserts them into
`Dkp` and forces the first character to `"Main"` status.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/assign.ts:41](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/assign.ts#L41)

***

### permissions

> `const` **permissions**: `"ManageGuild"` = `'ManageGuild'`

Defined in: [commands/census/assign.ts:28](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/assign.ts#L28)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/census/assign.ts:79](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/assign.ts#L79)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/assign.ts:100](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/assign.ts#L100)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

***

### getActiveStatuses()

> **getActiveStatuses**(): `Promise`\<[`Status`](/api/entities/status/#status)[]\>

Defined in: [commands/census/assign.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/assign.ts#L30)

#### Returns

`Promise`\<[`Status`](/api/entities/status/#status)[]\>

***

### statusMustBeActive()

> **statusMustBeActive**(`inputStatus`): `Promise`\<[`Status`](/api/entities/status/#status)\>

Defined in: [commands/census/assign.ts:35](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/assign.ts#L35)

#### Parameters

##### inputStatus

`string`

#### Returns

`Promise`\<[`Status`](/api/entities/status/#status)\>
