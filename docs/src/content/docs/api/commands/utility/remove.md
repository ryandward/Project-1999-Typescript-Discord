---
editUrl: false
next: true
prev: true
title: "commands/utility/remove"
---

`/remove` command — removes a self-assigned role from the invoker.

Autocomplete only shows self-assignable roles that the user currently has.
Counterpart to the `/add` command.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/utility/remove.ts:20](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/remove.ts#L20)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/remove.ts:31](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/remove.ts#L31)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/remove.ts:60](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/remove.ts#L60)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>
