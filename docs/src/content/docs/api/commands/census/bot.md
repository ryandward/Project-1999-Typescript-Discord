---
editUrl: false
next: true
prev: true
title: "commands/census/bot"
---

`/bot` command — registers a bot (shared/utility) character.

Creates a `Census` record with status `"Bot"`. Bot characters can
be claimed by other members via the `/claim` command. A warning disclaimer
is shown to the declarer.

Uses the shared `declareData` factory for its slash command definition.

## Variables

### data

> `const` **data**: `SlashCommandOptionsOnlyBuilder`

Defined in: [commands/census/bot.ts:23](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/bot.ts#L23)

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`Message`\<`boolean`\> \| `InteractionResponse`\<`boolean`\> \| `undefined`\>

Defined in: [commands/census/bot.ts:25](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/census/bot.ts#L25)

#### Parameters

##### interaction

`ChatInputCommandInteraction`

#### Returns

`Promise`\<`Message`\<`boolean`\> \| `InteractionResponse`\<`boolean`\> \| `undefined`\>
