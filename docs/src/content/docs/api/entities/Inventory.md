---
editUrl: false
next: true
prev: true
title: "entities/Inventory"
---

## Classes

### Inventory

Defined in: [entities/Inventory.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L11)

Character inventory snapshot (maps to `public.inventory`).

Stores per-character inventory data imported from EQ output files.
Separate from `Bank` which tracks guild banker inventories.

#### Constructors

##### Constructor

> **new Inventory**(): [`Inventory`](/api/entities/inventory/#inventory)

###### Returns

[`Inventory`](/api/entities/inventory/#inventory)

#### Properties

##### EqItemId

> **EqItemId**: `string` \| `null`

Defined in: [entities/Inventory.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L26)

EverQuest item database ID.

##### Id

> **Id**: `string`

Defined in: [entities/Inventory.ts:41](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L41)

##### Location

> **Location**: `string` \| `null`

Defined in: [entities/Inventory.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L18)

Inventory slot location (bag, bank slot, etc.).

##### Name

> **Name**: `string` \| `null`

Defined in: [entities/Inventory.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L22)

Item name.

##### Quantity

> **Quantity**: `string` \| `null`

Defined in: [entities/Inventory.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L30)

Stack count for stackable items.

##### Slots

> **Slots**: `string` \| `null`

Defined in: [entities/Inventory.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L34)

Raw slot data.

##### Time

> **Time**: `Date` \| `null`

Defined in: [entities/Inventory.ts:38](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L38)

Timestamp of the inventory import.

##### Toon

> **Toon**: `string` \| `null`

Defined in: [entities/Inventory.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/Inventory.ts#L14)

Character name who owns this inventory slot.
