---
title: "Shared Account Commands"
description: Manage shared guild EverQuest accounts for bot characters.
---

#### `/browse` `[class]` `[levelrange]`

Browse shared bot characters. Filter by class and/or level range. Select a character from the dropdown, then click the button to view login credentials (requires the account's assigned role).

> **You:** `/browse Cleric`
>
> **Bot:**
>
> **👥 Shared Bot Census**
>
> **Level Range: 55-60** -- 2 character(s)
>
> | Name | Class | Level |
> |------|-------|-------|
> | Lightouch | Cleric | 56 |
> | Patchwork | Cleric | 57 |
>
> `[Select a character to log in to...]`

After selecting a character, click "Get login" to view the account name, password, and notes (if your Discord role qualifies).

#### `/login` `<toon>` `[account]`

View or manage shared account credentials. Without an account name, displays the login info (ephemeral). With an account name (officer only), links the toon to that account.

> **You:** `/login Lightouch`
>
> **Bot** *(ephemeral):*
>
> **Account Information**
>
> | Field | Value |
> |-------|-------|
> | 👤 Toon | `Lightouch` |
> | 📒 Account | `guild_bots1` |
> | 🔑 Password | `********` |
> | 🎭 Role | @Officers |

---

### Officer Commands

These require `ManageGuild` permission.

#### `/account` `<account>` `[password]` `[role]`

View or update a shared account's password and/or required role.

#### `/listaccounts`

DMs you a text file listing all shared accounts, passwords, and linked toons accessible at your role level.

#### `/note` `<toon>` `[notes]`

Add or clear notes on a shared character. Notes appear in `/browse` under the character name.

#### `/delete_shared_toon` `<toon>`

Remove a shared toon entry permanently.
