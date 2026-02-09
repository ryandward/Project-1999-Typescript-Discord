---
editUrl: false
next: true
prev: true
title: "commands/bank/item_functions"
---

Helper functions for bank/item commands that integrate with a local MediaWiki instance.

Provides wiki-backed item image lookups, URL resolution, spell descriptions,
and stats-block extraction. Used by `/find`, `/browse`, and other bank commands.

## Functions

### formatField()

> **formatField**(`field`): `string`

Defined in: [commands/bank/item\_functions.ts:15](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/item_functions.ts#L15)

Formats an array of strings as inline-code lines for Discord embed fields.

#### Parameters

##### field

`string`[]

Lines to format.

#### Returns

`string`

***

### getImageUrl()

> **getImageUrl**(`itemName`): `Promise`\<`string` \| `null`\>

Defined in: [commands/bank/item\_functions.ts:43](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/item_functions.ts#L43)

Fetches the local filesystem path to an item's icon image from MediaWiki.

Strips `Song: ` / `Spell: ` prefixes, queries the wiki for `lucy_img_ID`
or `spellicon` template parameters, then resolves the `File:` page to a
local path under `/var/lib/mediawiki`.

#### Parameters

##### itemName

`string`

In-game item or spell name.

#### Returns

`Promise`\<`string` \| `null`\>

Local image path, or `null` if not found.

***

### getItemUrl()

> **getItemUrl**(`itemName`): `Promise`\<`string` \| `null`\>

Defined in: [commands/bank/item\_functions.ts:122](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/item_functions.ts#L122)

Resolves the full wiki URL for an item page.

#### Parameters

##### itemName

`string`

In-game item or spell name.

#### Returns

`Promise`\<`string` \| `null`\>

The `fullurl` of the wiki page, or `null` if not found.

***

### getSpellDescription()

> **getSpellDescription**(`spellName`): `Promise`\<`string` \| `null`\>

Defined in: [commands/bank/item\_functions.ts:150](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/item_functions.ts#L150)

Extracts the `classes` and `description` template fields from a spell's wiki page.

#### Parameters

##### spellName

`string`

Spell or song name.

#### Returns

`Promise`\<`string` \| `null`\>

Plain-text description with HTML tags stripped, or `null`.

***

### getStatsBlock()

> **getStatsBlock**(`itemName`): `Promise`\<`string` \| `null`\>

Defined in: [commands/bank/item\_functions.ts:202](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/97090a8103b8339c382e3a487a9bf412d98eb67d/commands/bank/item_functions.ts#L202)

Extracts the `statsblock` template field from an item's wiki page.

#### Parameters

##### itemName

`string`

In-game item name.

#### Returns

`Promise`\<`string` \| `null`\>

Plain-text stats block with HTML tags stripped, or `null`.
