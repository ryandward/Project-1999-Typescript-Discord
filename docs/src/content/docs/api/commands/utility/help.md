---
editUrl: false
next: true
prev: true
title: "commands/utility/help"
---

`/help` command — lists all available bot commands grouped by category.

Dynamically scans the `commands/` directory, imports each module, and
builds embed pages per folder. Commands with a `permissions` export are
hidden from users who lack the required permission.

## Variables

### data

> `const` **data**: `SlashCommandBuilder`

Defined in: [commands/utility/help.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/help.ts#L18)

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/utility/help.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/utility/help.ts#L22)

#### Parameters

##### interaction

`CommandInteraction`

#### Returns

`Promise`\<`void`\>
