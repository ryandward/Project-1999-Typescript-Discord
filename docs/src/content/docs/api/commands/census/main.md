---
editUrl: false
next: true
prev: true
title: "commands/census/main"
---

`/main` command — registers a player's primary character.

Creates a new `Census` record with status `"Main"`, inserts the user
into the `Dkp` table if they're new (via `insertUser`), and
assigns the "Probationary Member" role to first-time declarers.

Uses the shared `declareData` factory for its slash command definition.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/main.ts:23](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/main.ts#L23)

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/main.ts:25](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/main.ts#L25)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>
