---
editUrl: false
next: true
prev: true
title: "entities/Status"
---

## Classes

### Status

Defined in: [entities/Status.ts:15](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Status.ts#L15)

Read-only view of distinct census status values.

Defined as `SELECT DISTINCT status FROM census`.
Used to populate autocomplete dropdowns for status-based filters.

#### Constructors

##### Constructor

> **new Status**(): [`Status`](/api/entities/status/#status)

###### Returns

[`Status`](/api/entities/status/#status)

#### Properties

##### Status

> **Status**: `string`

Defined in: [entities/Status.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/Status.ts#L18)

A unique census status value (e.g. `"Main"`, `"Alt"`, `"Dropped"`).
