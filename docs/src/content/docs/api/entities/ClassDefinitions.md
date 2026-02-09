---
editUrl: false
next: true
prev: true
title: "entities/ClassDefinitions"
---

## Classes

### ClassDefinitions

Defined in: [entities/ClassDefinitions.ts:12](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/ClassDefinitions.ts#L12)

EverQuest class title definitions (maps to `public.class_definitions`).

Maps character class + level thresholds to EQ class titles
(e.g. a level 51 Cleric becomes a "Templar"). Used by the `/ding`
command to announce title changes on level-up.

#### Constructors

##### Constructor

> **new ClassDefinitions**(): [`ClassDefinitions`](/api/entities/classdefinitions/#classdefinitions)

###### Returns

[`ClassDefinitions`](/api/entities/classdefinitions/#classdefinitions)

#### Properties

##### CharacterClass

> **CharacterClass**: `string`

Defined in: [entities/ClassDefinitions.ts:19](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/ClassDefinitions.ts#L19)

Base character class this title belongs to (e.g. `"Cleric"`).

##### ClassName

> **ClassName**: `string`

Defined in: [entities/ClassDefinitions.ts:15](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/ClassDefinitions.ts#L15)

EQ class title name (e.g. `"Templar"`, `"Archmage"`).

##### Id

> **Id**: `string`

Defined in: [entities/ClassDefinitions.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/ClassDefinitions.ts#L22)

##### LevelAttained

> **LevelAttained**: `number`

Defined in: [entities/ClassDefinitions.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/ClassDefinitions.ts#L26)

Minimum level at which this class title is attained.
