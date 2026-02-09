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

Defined in: [commands/utility/create\_role.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/create_role.ts#L22)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/create\_role.ts:71](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/create_role.ts#L71)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/create\_role.ts:95](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/create_role.ts#L95)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
