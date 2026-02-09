---
title: "Census Commands"
description: Register and manage EverQuest characters.
---

Every guild member starts by declaring a `/main`, which creates their DKP record and assigns the Probationary Member role.

#### `/main` `<name>` `<level>` `<class>`

Register your primary character. First-time users also get a DKP entry (5 starting DKP) and the **Probationary Member** role.

> **You:** `/main Gortak 60 Shadow Knight`
>
> **Bot:** ✅ @You's `Gortak` is now a level `60` `Main` `Shadow Knight`!
>
> 💰 @You has been added to the DKP database with 5 DKP and is now a Probationary Member!

Class names autocomplete as you type -- "sk", "shadowknight", or "Shadow Knight" all work.

#### `/alt` `<name>` `<level>` `<class>`

Register an alternate character. You must already have a main.

> **You:** `/alt Windleaf 56 Druid`
>
> **Bot:** ✅ @You's `Windleaf` is now a level `56` `Alt` `Druid`!

#### `/bot` `<name>` `<level>` `<class>`

Register a bot character. Bots can be claimed by other guild members with `/claim`.

> **You:** `/bot Shieldwall 57 Warrior`
>
> **Bot:** ✅ @You's `Shieldwall` is now a level `57` `Bot` `Warrior`!

#### `/ding` `<name>` `[level]`

Level up a character. Without a level, increments by 1. With a level, sets it directly. Only works on characters you own.

> **You:** `/ding Gortak`
>
> **Bot:** ⬆️ `Gortak`'s level has been incremented to `57`!

> **You:** `/ding Gortak 60`
>
> **Bot:** ⏫ `Gortak`'s level has been set to `60`!

#### `/drop` `<name>`

Remove a character from the active census. The record stays in the database but is marked "Dropped" and hidden from active views.

> **You:** `/drop Oldtoon`
>
> **Bot:** ✅ Oldtoon has been dropped.

#### `/change` `<name>` `<status>`

Change a character's status (Main, Alt, Bot). Promoting an alt to Main automatically demotes your current main. You can't demote your only main.

> **You:** `/change Windleaf Main`
>
> **Bot:** ✅ `Windleaf`'s status has been changed to `Main`.

> **You:** `/change Gortak Bot`
>
> **Bot:** ✅ `Gortak`'s status has been changed to `Bot`.
>
> ⚠️ Disclaimer: Toons declared as bots can be claimed by other members.

#### `/claim` `<bot>`

Take ownership of someone else's bot character. Autocomplete shows available bots:

```
57 Warrior: Shieldwall
56 Cleric: Lightouch
55 Magician: Sparkfire
```

> **You:** `/claim Shieldwall`
>
> **Bot:** ✅ @You has successfully claimed `Shieldwall` from @PreviousOwner.

#### `/toons` `[name]`

Look up all characters for a player. Search by character name (autocomplete), or leave blank for your own.

> **You:** `/toons Gortak`
>
> **Bot:**
>
> **👥 Census Record** -- @SomePlayer
>
> **Main** -- 1 character(s)
>
> | Name | Class | Level |
> |------|-------|-------|
> | Gortak | Shadow Knight | 60 |
>
> **Alt** -- 3 character(s)
>
> | Name | Class | Level |
> |------|-------|-------|
> | Windleaf | Druid | 60 |
> | Sparkbolt | Enchanter | 57 |
> | Ironhide | Monk | 52 |

#### `/whois` `<user>`

Same as `/toons` but takes a `@user` mention instead of a character name.

---

### Officer Commands

These require `ManageGuild` permission.

#### `/promote` `<user>`

Promote a Probationary Member to full Member. Posts a congratulations message in the general channel. Autocomplete only shows probationary members.

> **You:** `/promote @NewRecruit`
>
> **Bot:** NewRecruit has been promoted to full member.
>
> *(in #general):* @Member Send your congrats to @NewRecruit, the newest full member of the guild!

#### `/assign` `<user>` `<status>` `<name>` `<level>` `<class>`

Create a character for any Discord user. Creates a DKP record automatically if needed.

> **You:** `/assign @NewRecruit Main Thornback 48 Monk`
>
> **Bot:** 💰 @NewRecruit has been added to the DKP database with 5 DKP and is now a Probationary Member!
>
> ✅ @NewRecruit's `Thornback` is now a level `48` `Main` `Monk`!

#### `/reassign` `<name>` `<user>` `<status>` `<level>` `<class>`

Update an existing character's owner, status, class, or level. Shows a before/after comparison.

> **You:** `/reassign Shieldwall @NewOwner Alt 57 Warrior`
>
> **Bot:**
>
> **⏩ Character Update for Shieldwall**
>
> | Previous | Updated |
> |----------|---------|
> | @OldOwner | @NewOwner |
> | Bot | Alt |
> | Warrior | Warrior |
> | 57 | 57 |
