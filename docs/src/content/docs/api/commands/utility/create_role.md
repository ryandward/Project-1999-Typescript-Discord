---
editUrl: false
next: true
prev: true
title: "commands/utility/create_role"
---

`/create_role` command — alternative interface for managing self-assignable roles.

Functionally identical to `/roles`. Subcommands: `add`, `remove`, `list`.
Requires `ManageRoles` permission.

## Variables

### data

> `const` **data**: `SlashCommandSubcommandsOnlyBuilder`

Defined in: [commands/utility/create\_role.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/create_role.ts#L22)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/create\_role.ts:71](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/create_role.ts#L71)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/create\_role.ts:95](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/create_role.ts#L95)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
