---
editUrl: false
next: true
prev: true
title: "events/check_for_promotions"
---

Scheduled task that checks for probationary members eligible for promotion.

Queries the `Dkp` table for users whose `DateJoined` falls between
2 and 4 weeks ago, then posts a reminder in the census channel
(`884164383498965042`) for any who still carry the "Probationary Member" role.

Called once at startup and then every 24 hours by the `ready` event handler.

## Functions

### checkForPromotions()

> **checkForPromotions**(): `Promise`\<`void`\>

Defined in: [events/check\_for\_promotions.ts:22](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/a2981f5ea093daef91a7ee9cd21b084e0192be70/events/check_for_promotions.ts#L22)

Scans for probationary members eligible for promotion and posts
reminders to officers in the census channel.

#### Returns

`Promise`\<`void`\>
