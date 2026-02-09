---
editUrl: false
next: true
prev: true
title: "entities/Raids"
---

## Classes

### Raids

Defined in: [entities/Raids.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Raids.ts#L11)

Raid event definitions (maps to `public.raids`).

Each row defines a named raid target and its associated DKP modifier.
Referenced by the `/attendance` command when officers record who
attended a specific raid.

#### Constructors

##### Constructor

> **new Raids**(): [`Raids`](/Project-1999-Typescript-Discord/api/entities/raids/#raids)

###### Returns

[`Raids`](/Project-1999-Typescript-Discord/api/entities/raids/#raids)

#### Properties

##### Id

> **Id**: `number` \| `null`

Defined in: [entities/Raids.ts:25](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Raids.ts#L25)

##### Modifier

> **Modifier**: `number` \| `null`

Defined in: [entities/Raids.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Raids.ts#L22)

DKP multiplier/modifier awarded for attending this raid.

##### Raid

> **Raid**: `string`

Defined in: [entities/Raids.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Raids.ts#L14)

Unique raid name, e.g. `"Nagafen"`, `"Vox"`. Also serves as the primary key.

##### Type

> **Type**: `string` \| `null`

Defined in: [entities/Raids.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Raids.ts#L18)

Raid category — e.g. `"Open World"`, `"Instanced"`.
