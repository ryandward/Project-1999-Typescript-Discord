---
editUrl: false
next: true
prev: true
title: "types"
---

## Classes

### TSClient

Defined in: [types.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/types.ts#L34)

Extended Discord.js `Client` that carries a [Command](#command) collection.

Instantiated once in `client.ts` and shared across the entire
application as a singleton.

#### Extends

- `Client`

#### Constructors

##### Constructor

> **new TSClient**(`options`): [`TSClient`](#tsclient)

Defined in: node\_modules/discord.js/typings/index.d.ts:1029

###### Parameters

###### options

`ClientOptions`

###### Returns

[`TSClient`](#tsclient)

###### Inherited from

`Client.constructor`

#### Properties

##### commands

> **commands**: `Collection`\<`string`, [`Command`](#command)\>

Defined in: [types.ts:36](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/types.ts#L36)

Map of command name → [Command](#command) object, populated at startup.

## Interfaces

### Command

Defined in: [types.ts:17](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/types.ts#L17)

Contract that every slash command module must satisfy.

Each command file in `commands/` exports an object conforming to this
interface. The bot loader in `index.ts` registers commands that have
at least `data` and `execute`.

#### Properties

##### data

> **data**: `SlashCommandBuilder`

Defined in: [types.ts:19](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/types.ts#L19)

Slash command definition built with the discord.js `SlashCommandBuilder`.

#### Methods

##### autocomplete()?

> `optional` **autocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [types.ts:23](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/types.ts#L23)

Handler invoked when Discord requests autocomplete suggestions for this command.

###### Parameters

###### interaction

`AutocompleteInteraction`

###### Returns

`Promise`\<`void`\>

##### execute()?

> `optional` **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [types.ts:21](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/types.ts#L21)

Handler invoked when a user runs the slash command.

###### Parameters

###### interaction

`CommandInteraction`

###### Returns

`Promise`\<`void`\>

##### handleModal()?

> `optional` **handleModal**(`interaction`): `Promise`\<`void`\>

Defined in: [types.ts:25](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/types.ts#L25)

Handler invoked when a modal submitted by this command is received.

###### Parameters

###### interaction

`ModalSubmitInteraction`

###### Returns

`Promise`\<`void`\>
