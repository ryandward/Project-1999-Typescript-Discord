---
editUrl: false
next: true
prev: true
title: "commands/census/census_functions"
---

Shared helper functions for census (character registration) commands.

Contains validation guards, character declaration helpers, autocomplete
suggestion builders, and the new-member onboarding flow. Imported by
`/main`, `/alt`, `/bot`, `/ding`, `/change`, `/drop`, and others.

## Functions

### classMustExist()

> **classMustExist**(`CharacterClass`): `Promise`\<[`ClassDefinitions`](/Project-1999-Typescript-Discord/api/entities/classdefinitions/#classdefinitions)\>

Defined in: [commands/census/census\_functions.ts:63](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L63)

Validates that a character class exists in the `ClassDefinitions` table.

#### Parameters

##### CharacterClass

`string`

Class name to look up (e.g. `"Cleric"`).

#### Returns

`Promise`\<[`ClassDefinitions`](/Project-1999-Typescript-Discord/api/entities/classdefinitions/#classdefinitions)\>

#### Throws

If the class is not found.

***

### declare()

> **declare**(`DiscordId`, `Status`, `Name`, `Level`, `CharacterClass`): `Promise`\<`string`\>

Defined in: [commands/census/census\_functions.ts:203](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L203)

Creates a new `Census` record for a character.

#### Parameters

##### DiscordId

`string`

Owner's Discord snowflake ID.

##### Status

`string`

Census status (`"Main"`, `"Alt"`, `"Bot"`).

##### Name

`string`

In-game character name.

##### Level

`number`

Character level (1–60).

##### CharacterClass

`string`

EverQuest class name.

#### Returns

`Promise`\<`string`\>

Confirmation or error message string for the interaction reply.

***

### declareAutocomplete()

> **declareAutocomplete**(`interaction`): `Promise`\<`void`\>

Defined in: [commands/census/census\_functions.ts:137](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L137)

Shared autocomplete handler for character class selection.

Responds with up to 20 matching `ClassDefinitions` entries
filtered by the user's partial input.

#### Parameters

##### interaction

`AutocompleteInteraction`

#### Returns

`Promise`\<`void`\>

***

### declareData()

> **declareData**(`status`): `Promise`\<`SlashCommandOptionsOnlyBuilder`\>

Defined in: [commands/census/census\_functions.ts:101](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L101)

Builds the `SlashCommandBuilder` definition used by `/main`, `/alt`, and `/bot`.

All three share the same option set (name, level, class) and only differ
in the status string that gets written to the database.

#### Parameters

##### status

`string`

The census status to assign (e.g. `"Main"`, `"Alt"`, `"Bot"`).

#### Returns

`Promise`\<`SlashCommandOptionsOnlyBuilder`\>

***

### formatField()

> **formatField**(`field`): `string`

Defined in: [commands/census/census\_functions.ts:325](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L325)

Joins an array of strings with newlines for embed field display.

#### Parameters

##### field

`string`[]

Lines to join.

#### Returns

`string`

***

### insertUser()

> **insertUser**(`DiscordId`): `Promise`\<`string` \| `false`\>

Defined in: [commands/census/census\_functions.ts:238](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L238)

Onboards a new guild member into the DKP system.

If the user doesn't already exist in `Dkp`, creates a record
with 5 starting DKP, assigns the "Probationary Member" Discord role,
and posts an announcement to the census channel (`884164383498965042`).

#### Parameters

##### DiscordId

`string`

Discord snowflake ID of the new member.

#### Returns

`Promise`\<`string` \| `false`\>

Confirmation message, or `false` if the user already existed.

***

### levelMustBeValid()

> **levelMustBeValid**(`Level`): `Promise`\<`number`\>

Defined in: [commands/census/census\_functions.ts:53](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L53)

Validates that a character level is within the valid EQ range (1–60).

#### Parameters

##### Level

`number`

The level to validate.

#### Returns

`Promise`\<`number`\>

#### Throws

If the level is out of range.

***

### returnAllActiveToonsByDiscordId()

> **returnAllActiveToonsByDiscordId**(`userId`): `Promise`\<`any`[]\>

Defined in: [commands/census/census\_functions.ts:312](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L312)

Returns all active characters owned by a specific Discord user.

#### Parameters

##### userId

`string`

Discord snowflake ID.

#### Returns

`Promise`\<`any`[]\>

***

### returnAllActiveToonsByName()

> **returnAllActiveToonsByName**(`partialName`): `Promise`\<`any`[]\>

Defined in: [commands/census/census\_functions.ts:295](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L295)

Finds a character by partial name, then returns **all** active characters
belonging to the same Discord user.

#### Parameters

##### partialName

`string`

Substring to match against character names.

#### Returns

`Promise`\<`any`[]\>

***

### suggestActiveToons()

> **suggestActiveToons**(`partialName`): `Promise`\<`any`[]\>

Defined in: [commands/census/census\_functions.ts:281](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L281)

Returns up to 20 active characters matching a partial name (case-insensitive).

#### Parameters

##### partialName

`string`

Substring to match against character names.

#### Returns

`Promise`\<`any`[]\>

***

### suggestCharacterClasses()

> **suggestCharacterClasses**(`partialName`, `level?`): `Promise`\<`any`[]\>

Defined in: [commands/census/census\_functions.ts:159](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L159)

Returns class definitions matching a partial name, optionally filtered by level.

#### Parameters

##### partialName

`string`

Substring to match against class/title names (case-insensitive).

##### level?

`number`

If provided, only returns titles attainable at or below this level.

#### Returns

`Promise`\<`any`[]\>

***

### toonMustExist()

> **toonMustExist**(`Name`): `Promise`\<[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census)\>

Defined in: [commands/census/census\_functions.ts:76](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L76)

Validates that a character exists in the `Census` table.

#### Parameters

##### Name

`string`

Exact character name to look up.

#### Returns

`Promise`\<[`Census`](/Project-1999-Typescript-Discord/api/entities/census/#census)\>

#### Throws

If the character is not found.

***

### toonMustNotExist()

> **toonMustNotExist**(`Name`): `Promise`\<`null`\>

Defined in: [commands/census/census\_functions.ts:87](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L87)

Validates that a character name is **not** already taken in the `Census` table.

#### Parameters

##### Name

`string`

Character name to check.

#### Returns

`Promise`\<`null`\>

#### Throws

If a character with that name already exists.

***

### userMustExist()

> **userMustExist**(`DiscordId`): `Promise`\<[`Dkp`](/Project-1999-Typescript-Discord/api/entities/dkp/#dkp)\>

Defined in: [commands/census/census\_functions.ts:27](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L27)

Validates that a user already exists in the DKP database.

#### Parameters

##### DiscordId

`string`

Discord snowflake ID to look up.

#### Returns

`Promise`\<[`Dkp`](/Project-1999-Typescript-Discord/api/entities/dkp/#dkp)\>

The `Dkp` record for the user.

#### Throws

If the user is not found.

***

### userMustNotExist()

> **userMustNotExist**(`DiscordId`): `Promise`\<`null`\>

Defined in: [commands/census/census\_functions.ts:42](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L42)

Validates that a user does **not** yet exist in the DKP database.

#### Parameters

##### DiscordId

`string`

Discord snowflake ID to check.

#### Returns

`Promise`\<`null`\>

#### Throws

If the user already exists.

***

### validCharacterClasses()

> **validCharacterClasses**(): `Promise`\<`object`[]\>

Defined in: [commands/census/census\_functions.ts:177](https://github.com/ryandward/Project-1999-Typescript-Discord/blob/038b94228a9b42df2778326b640b435f54f0f323/commands/census/census_functions.ts#L177)

Returns the list of valid base character classes (where class name = character class).

Used to populate the `class` option choices on slash command builders.

#### Returns

`Promise`\<`object`[]\>
