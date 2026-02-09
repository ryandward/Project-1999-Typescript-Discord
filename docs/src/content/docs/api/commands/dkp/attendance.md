---
editUrl: false
next: true
prev: true
title: "commands/dkp/attendance"
---

`/attendance` command — records raid attendance from pasted `/who` logs.

Flow: officer selects a raid (autocomplete from `Raids` table) ->
modal opens for pasting `/who` output -> `parseWhoLogs` extracts
player names -> cross-references with `Census` -> creates
`Attendance` records and awards DKP.

This is the most complex command, using a modal submission flow via
`handleModal` and an in-memory `pendingRaids` map to bridge
the command and modal interactions.

Requires `ManageRoles` permission.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/dkp/attendance.ts:37](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/dkp/attendance.ts#L37)

## Functions

### autocomplete()

> **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/dkp/attendance.ts:49](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/dkp/attendance.ts#L49)

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/dkp/attendance.ts:76](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/dkp/attendance.ts#L76)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`void`\>

***

### handleModal()

> **handleModal**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/dkp/attendance.ts:185](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/dkp/attendance.ts#L185)

#### Parameters

##### interaction

`ModalSubmitInteraction`

#### Returns

`Promise`\<`void`\>
