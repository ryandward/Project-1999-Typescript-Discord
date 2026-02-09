---
editUrl: false
next: true
prev: true
title: "events/ready"
---

`ClientReady` event handler — fires once after the bot successfully logs in.

On startup it immediately runs `checkForPromotions` and then
schedules it to repeat every 24 hours.

## Variables

### name

> `const` **name**: `ClientReady` = `Events.ClientReady`

Defined in: [events/ready.ts:14](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/events/ready.ts#L14)

Discord event name this module handles.

***

### once

> `const` **once**: `true` = `true`

Defined in: [events/ready.ts:16](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/events/ready.ts#L16)

When `true`, the event listener fires only once.

## Functions

### execute()

> **execute**(`client`): `Promise`\<`void`\>

Defined in: [events/ready.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/events/ready.ts#L22)

Logs the bot's identity and starts the daily promotion-check interval.

#### Parameters

##### client

[`TSClient`](../../types/#tsclient)

The fully initialised `TSClient`.

#### Returns

`Promise`\<`void`\>
