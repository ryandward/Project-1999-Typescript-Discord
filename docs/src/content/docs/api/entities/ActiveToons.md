---
editUrl: false
next: true
prev: true
title: "entities/ActiveToons"
---

## Classes

### ActiveToons

Defined in: [entities/ActiveToons.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/ActiveToons.ts#L18)

Read-only database view returning only non-dropped characters.

Defined as `SELECT * FROM census WHERE status != 'Dropped'`.
Commands that need to list "current" characters (e.g. `/toons`, autocomplete
helpers) query this view instead of the raw `Census` table.

#### Extends

- [`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census)

#### Constructors

##### Constructor

> **new ActiveToons**(): [`ActiveToons`](/Project-1999-Typescript-Discord/api/entities/activetoons/#activetoons)

###### Returns

[`ActiveToons`](/Project-1999-Typescript-Discord/api/entities/activetoons/#activetoons)

###### Inherited from

[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census).[`constructor`](/Project-1999-Typescript-Discord/api/entities/census/#census)

#### Properties

##### CharacterClass

> **CharacterClass**: `string`

Defined in: [entities/Census.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Census.ts#L26)

EverQuest class name, e.g. `"Cleric"`, `"Wizard"`.

###### Inherited from

[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census).[`CharacterClass`](/Project-1999-Typescript-Discord/api/entities/census/#census)

##### DiscordId

> **DiscordId**: `string`

Defined in: [entities/Census.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Census.ts#L18)

Discord snowflake ID of the player who owns this character.

###### Inherited from

[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census).[`DiscordId`](/Project-1999-Typescript-Discord/api/entities/census/#census)

##### Id

> **Id**: `number`

Defined in: [entities/Census.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Census.ts#L14)

###### Inherited from

[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census).[`Id`](/Project-1999-Typescript-Discord/api/entities/census/#census)

##### Level

> **Level**: `number`

Defined in: [entities/Census.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Census.ts#L30)

Current character level (1–60).

###### Inherited from

[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census).[`Level`](/Project-1999-Typescript-Discord/api/entities/census/#census)

##### Name

> **Name**: `string`

Defined in: [entities/Census.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Census.ts#L22)

In-game character name (unique within active records).

###### Inherited from

[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census).[`Name`](/Project-1999-Typescript-Discord/api/entities/census/#census)

##### Status

> **Status**: `string`

Defined in: [entities/Census.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Census.ts#L34)

Membership status — `"Main"`, `"Alt"`, `"Bot"`, `"Dropped"`, or `"Probationary"`.

###### Inherited from

[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census).[`Status`](/Project-1999-Typescript-Discord/api/entities/census/#census)

##### Time

> **Time**: `Date`

Defined in: [entities/Census.ts:38](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Census.ts#L38)

Timestamp when this record was created or last updated.

###### Inherited from

[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census).[`Time`](/Project-1999-Typescript-Discord/api/entities/census/#census)
