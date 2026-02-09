---
editUrl: false
next: true
prev: true
title: "commands/utility/roles"
---

`/roles` command — officer tool for managing the self-assignable role system.

Subcommands:
- `add` — creates a new Discord role and registers it as self-assignable
- `remove` — deletes a self-assignable role from both Discord and the database
- `list` — displays all currently registered self-assignable roles

Requires `ManageRoles` permission.

## Variables

### data

> `const` **data**: `SlashCommandSubcommandsOnlyBuilder`

Defined in: [commands/utility/roles.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/roles.ts#L26)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/roles.ts:75](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/roles.ts#L75)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/roles.ts:99](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/utility/roles.ts#L99)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
