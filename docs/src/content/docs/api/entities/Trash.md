---
editUrl: false
next: true
prev: true
title: "entities/Trash"
---

## Classes

### Trash

Defined in: [entities/Trash.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Trash.ts#L11)

Trash item filter list (maps to `public.trash`).

Items on this list are excluded from bank import processing,
preventing common junk items from cluttering the guild bank records.

#### Constructors

##### Constructor

> **new Trash**(): [`Trash`](/Project-1999-Typescript-Discord/api/entities/trash/#trash)

###### Returns

[`Trash`](/Project-1999-Typescript-Discord/api/entities/trash/#trash)

#### Properties

##### Id

> **Id**: `string`

Defined in: [entities/Trash.ts:17](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Trash.ts#L17)

##### Name

> **Name**: `string` \| `null`

Defined in: [entities/Trash.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Trash.ts#L14)

Item name to filter out during bank imports.
