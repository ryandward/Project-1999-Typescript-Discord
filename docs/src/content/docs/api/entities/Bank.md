---
editUrl: false
next: true
prev: true
title: "entities/Bank"
---

## Classes

### Bank

Defined in: [entities/Bank.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L11)

Guild bank inventory record (maps to `public.bank`).

Tracks items stored across guild banker characters.
Populated by the `/income` command and consumed by `/find` and `/browse`.

#### Constructors

##### Constructor

> **new Bank**(): [`Bank`](/Project-1999-Typescript-Discord/api/entities/bank/#bank)

###### Returns

[`Bank`](/Project-1999-Typescript-Discord/api/entities/bank/#bank)

#### Properties

##### Banker

> **Banker**: `string`

Defined in: [entities/Bank.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L14)

Name of the banker character holding this item.

##### EqItemId

> **EqItemId**: `string`

Defined in: [entities/Bank.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L26)

EverQuest item database ID, used for wiki lookups.

##### Id

> **Id**: `string`

Defined in: [entities/Bank.ts:41](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L41)

##### Location

> **Location**: `string`

Defined in: [entities/Bank.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L18)

Inventory slot location on the banker (e.g. bag position).

##### Name

> **Name**: `string`

Defined in: [entities/Bank.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L22)

Item name as it appears in-game.

##### Quantity

> **Quantity**: `number`

Defined in: [entities/Bank.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L30)

Stack count for stackable items.

##### Slots

> **Slots**: `string`

Defined in: [entities/Bank.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L34)

Raw slot data from the inventory export.

##### Time

> **Time**: `Date`

Defined in: [entities/Bank.ts:38](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Bank.ts#L38)

Timestamp when this bank record was imported.
