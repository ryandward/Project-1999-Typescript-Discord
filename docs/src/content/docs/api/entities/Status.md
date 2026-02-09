---
editUrl: false
next: true
prev: true
title: "entities/Status"
---

## Classes

### Status

Defined in: [entities/Status.ts:15](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Status.ts#L15)

Read-only view of distinct census status values.

Defined as `SELECT DISTINCT status FROM census`.
Used to populate autocomplete dropdowns for status-based filters.

#### Constructors

##### Constructor

> **new Status**(): [`Status`](/Project-1999-Typescript-Discord/api/entities/status/#status)

###### Returns

[`Status`](/Project-1999-Typescript-Discord/api/entities/status/#status)

#### Properties

##### Status

> **Status**: `string`

Defined in: [entities/Status.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/entities/Status.ts#L18)

A unique census status value (e.g. `"Main"`, `"Alt"`, `"Dropped"`).
