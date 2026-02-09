---
editUrl: false
next: true
prev: true
title: "entities/Dkp"
---

## Classes

### Dkp

Defined in: [entities/Dkp.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Dkp.ts#L11)

Dragon Kill Points ledger (maps to `public.dkp`).

Each row represents a guild member's cumulative DKP balance.
Points are earned via raid attendance and spent on loot bids.

#### Constructors

##### Constructor

> **new Dkp**(): [`Dkp`](/Project-1999-Typescript-Discord/api/entities/dkp/#dkp)

###### Returns

[`Dkp`](/Project-1999-Typescript-Discord/api/entities/dkp/#dkp)

#### Properties

##### DateJoined

> **DateJoined**: `Date`

Defined in: [entities/Dkp.ts:36](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Dkp.ts#L36)

Date the member originally joined the guild.

##### DiscordId

> **DiscordId**: `string`

Defined in: [entities/Dkp.ts:29](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Dkp.ts#L29)

Discord snowflake ID linking this record to a Discord user.

##### DiscordName

> **DiscordName**: `string`

Defined in: [entities/Dkp.ts:17](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Dkp.ts#L17)

Discord display name at the time the record was created.

##### EarnedDkp

> **EarnedDkp**: `number`

Defined in: [entities/Dkp.ts:21](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Dkp.ts#L21)

Total DKP earned from raid attendance.

##### Id

> **Id**: `number`

Defined in: [entities/Dkp.ts:13](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Dkp.ts#L13)

##### SpentDkp

> **SpentDkp**: `number`

Defined in: [entities/Dkp.ts:25](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Dkp.ts#L25)

Total DKP spent on loot claims.
