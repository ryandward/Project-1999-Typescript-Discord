---
editUrl: false
next: true
prev: true
title: "entities/SelfRoles"
---

## Classes

### SelfRoles

Defined in: [entities/SelfRoles.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/SelfRoles.ts#L11)

Self-assignable Discord roles (maps to `public.self_roles`).

Officers register roles here via `/create_role`; members can then
assign/remove these roles on themselves using the `/roles` command.

#### Constructors

##### Constructor

> **new SelfRoles**(): [`SelfRoles`](/api/entities/selfroles/#selfroles)

###### Returns

[`SelfRoles`](/api/entities/selfroles/#selfroles)

#### Properties

##### Description

> **Description**: `string` \| `null`

Defined in: [entities/SelfRoles.ts:25](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/SelfRoles.ts#L25)

Description displayed when browsing available self-roles.

##### Id

> **Id**: `string`

Defined in: [entities/SelfRoles.ts:13](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/SelfRoles.ts#L13)

##### RoleId

> **RoleId**: `string`

Defined in: [entities/SelfRoles.ts:17](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/SelfRoles.ts#L17)

Discord role snowflake ID.

##### RoleName

> **RoleName**: `string`

Defined in: [entities/SelfRoles.ts:21](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/SelfRoles.ts#L21)

Human-readable role name shown in the selection menu.
