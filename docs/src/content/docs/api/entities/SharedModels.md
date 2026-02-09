---
editUrl: false
next: true
prev: true
title: "entities/SharedModels"
---

## Classes

### SharedAccounts

Defined in: [entities/SharedModels.ts:21](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L21)

Shared guild account (maps to `public.shared_accounts`).

Represents an EverQuest account that is shared among guild members
(e.g. a guild-owned trader or buff bot). Each account can own
multiple [SharedToons](/api/entities/sharedmodels/#sharedtoons-1).

#### Constructors

##### Constructor

> **new SharedAccounts**(): [`SharedAccounts`](/api/entities/sharedmodels/#sharedaccounts)

###### Returns

[`SharedAccounts`](/api/entities/sharedmodels/#sharedaccounts)

#### Properties

##### Account

> **Account**: `string`

Defined in: [entities/SharedModels.ts:27](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L27)

Unique account identifier / login name.

##### Id

> **Id**: `number`

Defined in: [entities/SharedModels.ts:23](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L23)

##### Password

> **Password**: `string`

Defined in: [entities/SharedModels.ts:31](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L31)

Account password (stored in plaintext — shared guild accounts only).

##### Role

> **Role**: `string`

Defined in: [entities/SharedModels.ts:35](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L35)

Access role governing who may use this account (e.g. `"Officer"`, `"Member"`).

##### SharedToons

> **SharedToons**: [`SharedToons`](/api/entities/sharedmodels/#sharedtoons-1)[]

Defined in: [entities/SharedModels.ts:39](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L39)

Characters that belong to this shared account.

***

### SharedToons

Defined in: [entities/SharedModels.ts:52](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L52)

Character on a shared guild account (maps to `public.shared_toons`).

Linked to a [SharedAccounts](/api/entities/sharedmodels/#sharedaccounts) record via a foreign key on the
`account` column. Officers manage these through `/login`, `/add`,
`/remove`, and `/delete_shared_toon` commands.

#### Constructors

##### Constructor

> **new SharedToons**(): [`SharedToons`](/api/entities/sharedmodels/#sharedtoons-1)

###### Returns

[`SharedToons`](/api/entities/sharedmodels/#sharedtoons-1)

#### Properties

##### Account

> **Account**: [`SharedAccounts`](/api/entities/sharedmodels/#sharedaccounts)

Defined in: [entities/SharedModels.ts:67](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L67)

The [SharedAccounts](/api/entities/sharedmodels/#sharedaccounts) this character belongs to.

##### Id

> **Id**: `number`

Defined in: [entities/SharedModels.ts:54](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L54)

##### Name

> **Name**: `string`

Defined in: [entities/SharedModels.ts:58](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L58)

Unique in-game character name.

##### Notes

> **Notes**: `string` \| `null`

Defined in: [entities/SharedModels.ts:62](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/entities/SharedModels.ts#L62)

Free-text notes about this character (class, purpose, gear status, etc.).
