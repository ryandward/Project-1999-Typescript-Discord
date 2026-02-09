---
editUrl: false
next: true
prev: true
title: "entities/ActiveToons"
---

## Classes

### ActiveToons

Defined in: [entities/ActiveToons.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/ActiveToons.ts#L18)

Read-only database view returning only non-dropped characters.

Defined as `SELECT * FROM census WHERE status != 'Dropped'`.
Commands that need to list "current" characters (e.g. `/toons`, autocomplete
helpers) query this view instead of the raw `Census` table.

#### Extends

- [`Census`](/api/entities/census/#census)

#### Constructors

##### Constructor

> **new ActiveToons**(): [`ActiveToons`](/api/entities/activetoons/#activetoons)

###### Returns

[`ActiveToons`](/api/entities/activetoons/#activetoons)

###### Inherited from

[`Census`](/api/entities/census/#census).[`constructor`](/api/entities/census/#census)

#### Properties

##### CharacterClass

> **CharacterClass**: `string`

Defined in: [entities/Census.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Census.ts#L26)

EverQuest class name, e.g. `"Cleric"`, `"Wizard"`.

###### Inherited from

[`Census`](/api/entities/census/#census).[`CharacterClass`](/api/entities/census/#census)

##### DiscordId

> **DiscordId**: `string`

Defined in: [entities/Census.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Census.ts#L18)

Discord snowflake ID of the player who owns this character.

###### Inherited from

[`Census`](/api/entities/census/#census).[`DiscordId`](/api/entities/census/#census)

##### Id

> **Id**: `number`

Defined in: [entities/Census.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Census.ts#L14)

###### Inherited from

[`Census`](/api/entities/census/#census).[`Id`](/api/entities/census/#census)

##### Level

> **Level**: `number`

Defined in: [entities/Census.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Census.ts#L30)

Current character level (1–60).

###### Inherited from

[`Census`](/api/entities/census/#census).[`Level`](/api/entities/census/#census)

##### Name

> **Name**: `string`

Defined in: [entities/Census.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Census.ts#L22)

In-game character name (unique within active records).

###### Inherited from

[`Census`](/api/entities/census/#census).[`Name`](/api/entities/census/#census)

##### Status

> **Status**: `string`

Defined in: [entities/Census.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Census.ts#L34)

Membership status — `"Main"`, `"Alt"`, `"Bot"`, `"Dropped"`, or `"Probationary"`.

###### Inherited from

[`Census`](/api/entities/census/#census).[`Status`](/api/entities/census/#census)

##### Time

> **Time**: `Date`

Defined in: [entities/Census.ts:38](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Census.ts#L38)

Timestamp when this record was created or last updated.

###### Inherited from

[`Census`](/api/entities/census/#census).[`Time`](/api/entities/census/#census)
