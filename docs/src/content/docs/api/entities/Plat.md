---
editUrl: false
next: true
prev: true
title: "entities/Plat"
---

## Classes

### Plat

Defined in: [entities/Plat.ts:12](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Plat.ts#L12)

Platinum currency transaction ledger (maps to `public.plat`).

Records individual plat deposits and withdrawals for guild banking.
Positive amounts are deposits; negative amounts are withdrawals.
Managed via the `/plat` command by officers.

#### Constructors

##### Constructor

> **new Plat**(): [`Plat`](/Project-1999-Typescript-Discord/api/entities/plat/#plat)

###### Returns

[`Plat`](/Project-1999-Typescript-Discord/api/entities/plat/#plat)

#### Properties

##### Amount

> **Amount**: `number`

Defined in: [entities/Plat.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Plat.ts#L22)

Transaction amount in platinum (positive = deposit, negative = withdrawal).

##### Description

> **Description**: `string` \| `null`

Defined in: [entities/Plat.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Plat.ts#L34)

Human-readable description of the transaction purpose.

##### DiscordId

> **DiscordId**: `string`

Defined in: [entities/Plat.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Plat.ts#L18)

Discord snowflake ID of the member involved in this transaction.

##### Id

> **Id**: `number`

Defined in: [entities/Plat.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Plat.ts#L14)

##### TransactionTime

> **TransactionTime**: `Date` \| `null`

Defined in: [entities/Plat.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/e3f3f455578400652e315353e14cc07758d61eac/entities/Plat.ts#L30)

When the transaction occurred (defaults to current timestamp).
