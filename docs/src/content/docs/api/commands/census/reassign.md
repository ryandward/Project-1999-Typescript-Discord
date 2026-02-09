---
editUrl: false
next: true
prev: true
title: "commands/census/reassign"
---

`/reassign` command — officer tool to update an existing character's owner, status, class, or level.

Requires `ManageGuild` permission. Shows a before/after embed comparing
the old and new values. Useful for correcting data entry mistakes or
transferring characters between players.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/reassign.ts:46](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/reassign.ts#L46)

***

### permissions

> `const` **permissions**: `"ManageGuild"` = `'ManageGuild'`

Defined in: [commands/census/reassign.ts:33](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/reassign.ts#L33)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/census/reassign.ts:86](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/reassign.ts#L86)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/reassign.ts:107](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/reassign.ts#L107)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

***

### getActiveStatuses()

> **getActiveStatuses**(): `Promise`\<[`Status`](../../../entities/status/#status)[]\>

Defined in: [commands/census/reassign.ts:35](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/reassign.ts#L35)

#### Returns

`Promise`\<[`Status`](../../../entities/status/#status)[]\>

***

### statusMustBeActive()

> **statusMustBeActive**(`inputStatus`): `Promise`\<[`Status`](../../../entities/status/#status)\>

Defined in: [commands/census/reassign.ts:40](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/reassign.ts#L40)

#### Parameters

##### inputStatus

`string`

#### Returns

`Promise`\<[`Status`](../../../entities/status/#status)\>
