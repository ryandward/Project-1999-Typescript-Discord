---
editUrl: false
next: true
prev: true
title: "entities/ClassRoles"
---

## Classes

### ClassRoles

Defined in: [entities/ClassRoles.ts:11](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/ClassRoles.ts#L11)

Mapping from EQ class to Discord role (maps to `public.class_roles`).

Used to automatically assign Discord roles based on a character's class
when they are declared via `/main`, `/alt`, or `/bot`.

#### Constructors

##### Constructor

> **new ClassRoles**(): [`ClassRoles`](/api/entities/classroles/#classroles)

###### Returns

[`ClassRoles`](/api/entities/classroles/#classroles)

#### Properties

##### CharacterClass

> **CharacterClass**: `string` \| `null`

Defined in: [entities/ClassRoles.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/ClassRoles.ts#L14)

EverQuest class name (e.g. `"Warrior"`).

##### Id

> **Id**: `string`

Defined in: [entities/ClassRoles.ts:21](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/ClassRoles.ts#L21)

##### RoleId

> **RoleId**: `string` \| `null`

Defined in: [entities/ClassRoles.ts:18](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/entities/ClassRoles.ts#L18)

Discord role snowflake ID to assign for this class.
