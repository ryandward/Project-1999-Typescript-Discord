---
editUrl: false
next: true
prev: true
title: "commands/utility/browse"
---

`/browse` command — displays shared bot characters with interactive login.

Shows a census-style embed of all bot characters that also exist in the
`SharedToons` table, filterable by class and level range. Users can
select a character from a dropdown and click "Get login" to retrieve
account credentials (via `loginLogic`).

Uses interactive select-menu and button collectors.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/utility/browse.ts:47](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/browse.ts#L47)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/browse.ts:70](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/browse.ts#L70)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/browse.ts:81](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/browse.ts#L81)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>

***

### statusMustBeActive()

> **statusMustBeActive**(`inputStatus`): `Promise`\<[`Status`](/Project-1999-Typescript-Discord/api/entities/status/#status)\>

Defined in: [commands/utility/browse.ts:41](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/commands/utility/browse.ts#L41)

#### Parameters

##### inputStatus

`string`

#### Returns

`Promise`\<[`Status`](/Project-1999-Typescript-Discord/api/entities/status/#status)\>
