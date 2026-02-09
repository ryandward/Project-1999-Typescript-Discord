---
editUrl: false
next: true
prev: true
title: "entities/Items"
---

## Classes

### Items

Defined in: [entities/Items.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Items.ts#L11)

Loot award history (maps to `public.items`).

Records which player won an item and how much DKP they spent.
Used for auditing loot distribution and tracking DKP expenditure.

#### Constructors

##### Constructor

> **new Items**(): [`Items`](/Project-1999-Typescript-Discord/api/entities/items/#items)

###### Returns

[`Items`](/Project-1999-Typescript-Discord/api/entities/items/#items)

#### Properties

##### Date

> **Date**: `Date` \| `null`

Defined in: [entities/Items.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Items.ts#L18)

Date the item was awarded.

##### DiscordId

> **DiscordId**: `string` \| `null`

Defined in: [entities/Items.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Items.ts#L30)

Discord snowflake ID of the player who received the item.

##### DkpSpent

> **DkpSpent**: `string` \| `null`

Defined in: [entities/Items.ts:26](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Items.ts#L26)

Amount of DKP spent to win this item.

##### Id

> **Id**: `string`

Defined in: [entities/Items.ts:33](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Items.ts#L33)

##### Item

> **Item**: `string` \| `null`

Defined in: [entities/Items.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Items.ts#L22)

Name of the item that was awarded.

##### Name

> **Name**: `string` \| `null`

Defined in: [entities/Items.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Items.ts#L14)

Character name of the player who received the item.
