---
editUrl: false
next: true
prev: true
title: "events/interaction_create"
---

Central interaction router for the Discord gateway.

Listens for `Events.InteractionCreate` and dispatches to the
appropriate handler based on interaction type:
- `CommandInteraction` → `command.execute()`
- `AutocompleteInteraction` → `command.autocomplete()`
- `ModalSubmitInteraction` → `command.handleModal()` (currently only `attendance_modal`)

## Variables

### name

> `const` **name**: `InteractionCreate` = `Events.InteractionCreate`

Defined in: [events/interaction\_create.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/events/interaction_create.ts#L22)

Discord event name this module handles.

## Functions

### execute()

> **execute**(`interaction`): `Promise`\<`void`\>

Defined in: [events/interaction\_create.ts:28](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/events/interaction_create.ts#L28)

Routes an incoming interaction to the correct command handler.

#### Parameters

##### interaction

`Interaction`

The raw Discord interaction.

#### Returns

`Promise`\<`void`\>
