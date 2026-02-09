---
editUrl: false
next: true
prev: true
title: "commands/census/alt"
---

`/alt` command — registers an alternate character for an existing member.

Validates the user already exists in `Dkp` (must have a main first),
then creates a new `Census` record with status `"Alt"`.

Uses the shared `declareData` factory for its slash command definition.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/alt.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/census/alt.ts#L22)

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/alt.ts:24](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/commands/census/alt.ts#L24)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`InteractionResponse`\<`boolean`\> \| `undefined`\>
