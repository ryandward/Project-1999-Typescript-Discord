---
editUrl: false
next: true
prev: true
title: "entities/Trash"
---

## Classes

### Trash

Defined in: [entities/Trash.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Trash.ts#L11)

Trash item filter list (maps to `public.trash`).

Items on this list are excluded from bank import processing,
preventing common junk items from cluttering the guild bank records.

#### Constructors

##### Constructor

> **new Trash**(): [`Trash`](/api/entities/trash/#trash)

###### Returns

[`Trash`](/api/entities/trash/#trash)

#### Properties

##### Id

> **Id**: `string`

Defined in: [entities/Trash.ts:17](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Trash.ts#L17)

##### Name

> **Name**: `string` \| `null`

Defined in: [entities/Trash.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Trash.ts#L14)

Item name to filter out during bank imports.
