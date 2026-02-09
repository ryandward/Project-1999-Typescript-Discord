---
editUrl: false
next: true
prev: true
title: "entities/Attendance"
---

## Classes

### Attendance

Defined in: [entities/Attendance.ts:12](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Attendance.ts#L12)

Raid attendance record (maps to `public.attendance`).

Rows are created by the `/attendance` command when an officer pastes a
`/who` log. Each row links a character name to a specific raid event,
feeding into the DKP calculation pipeline.

#### Constructors

##### Constructor

> **new Attendance**(): [`Attendance`](/api/entities/attendance/#attendance)

###### Returns

[`Attendance`](/api/entities/attendance/#attendance)

#### Properties

##### Date

> **Date**: `Date` \| `null`

Defined in: [entities/Attendance.ts:23](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Attendance.ts#L23)

Date/time of the attendance record.

##### DiscordId

> **DiscordId**: `string` \| `null`

Defined in: [entities/Attendance.ts:27](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Attendance.ts#L27)

Discord snowflake ID of the character's owner.

##### Id

> **Id**: `string`

Defined in: [entities/Attendance.ts:30](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Attendance.ts#L30)

##### Modifier

> **Modifier**: `string` \| `null`

Defined in: [entities/Attendance.ts:34](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Attendance.ts#L34)

DKP modifier applied for this attendance (from the `Raids` table).

##### Name

> **Name**: `string` \| `null`

Defined in: [entities/Attendance.ts:19](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Attendance.ts#L19)

Character name present at the raid.

##### Raid

> **Raid**: `string` \| `null`

Defined in: [entities/Attendance.ts:15](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Attendance.ts#L15)

Name of the raid event (foreign key concept to `Raids`).
