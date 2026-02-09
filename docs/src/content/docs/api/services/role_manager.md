---
editUrl: false
next: true
prev: true
title: "services/role_manager"
---

## Classes

### DiscordRoleManager

Defined in: [services/role\_manager.ts:10](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/services/role_manager.ts#L10)

Service for managing Discord guild roles programmatically.

Wraps the discord.js guild/role API behind a simple interface used by
census functions and promotion logic to assign roles to members.

#### Constructors

##### Constructor

> **new DiscordRoleManager**(): [`DiscordRoleManager`](/Project-1999-Typescript-Discord/api/services/role_manager/#discordrolemanager)

###### Returns

[`DiscordRoleManager`](/Project-1999-Typescript-Discord/api/services/role_manager/#discordrolemanager)

#### Methods

##### addRoleToUser()

> **addRoleToUser**(`guildId`, `userId`, `roleName`): `Promise`\<`void`\>

Defined in: [services/role\_manager.ts:39](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/services/role_manager.ts#L39)

Adds a named role to a guild member.

###### Parameters

###### guildId

`string`

Discord guild snowflake ID.

###### userId

`string`

Discord user snowflake ID.

###### roleName

`string`

Exact name of the role to add.

###### Returns

`Promise`\<`void`\>
