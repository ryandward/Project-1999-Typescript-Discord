---
editUrl: false
next: true
prev: true
title: "entities/Census"
---

## Classes

### Census

Defined in: [entities/Census.ts:12](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Census.ts#L12)

Core guild-member character record (maps to `public.census`).

Every registered character — main, alt, or bot — gets a row here.
`Status` distinguishes active members from dropped ones;
the `ActiveToons` view filters to non-dropped records.

#### Extended by

- [`ActiveToons`](../activetoons/#activetoons)

#### Constructors

##### Constructor

> **new Census**(): [`Census`](#census)

###### Returns

[`Census`](#census)

#### Properties

##### CharacterClass

> **CharacterClass**: `string`

Defined in: [entities/Census.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Census.ts#L26)

EverQuest class name, e.g. `"Cleric"`, `"Wizard"`.

##### DiscordId

> **DiscordId**: `string`

Defined in: [entities/Census.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Census.ts#L18)

Discord snowflake ID of the player who owns this character.

##### Id

> **Id**: `number`

Defined in: [entities/Census.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Census.ts#L14)

##### Level

> **Level**: `number`

Defined in: [entities/Census.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Census.ts#L30)

Current character level (1–60).

##### Name

> **Name**: `string`

Defined in: [entities/Census.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Census.ts#L22)

In-game character name (unique within active records).

##### Status

> **Status**: `string`

Defined in: [entities/Census.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Census.ts#L34)

Membership status — `"Main"`, `"Alt"`, `"Bot"`, `"Dropped"`, or `"Probationary"`.

##### Time

> **Time**: `Date`

Defined in: [entities/Census.ts:38](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Census.ts#L38)

Timestamp when this record was created or last updated.
