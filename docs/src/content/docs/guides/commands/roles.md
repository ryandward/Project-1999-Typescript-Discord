---
title: "Role Commands"
description: Self-assignable Discord roles.
---

#### `/add` `<role>`

Add a self-assignable role to yourself. Autocomplete shows available roles with descriptions.

> **You:** `/add LFG`
>
> **Bot:** ✅ @You added @LFG to their roles.

#### `/remove` `<role>`

Remove a self-assignable role. Autocomplete only shows roles you currently have.

> **You:** `/remove LFG`
>
> **Bot:** ✅ @You removed @LFG from their roles.

---

### Officer Commands

These require `ManageRoles` permission.

#### `/roles add` `<name>` `[description]` `[color]`

Create a new self-assignable role.

> **You:** `/roles add LFG Looking for group`
>
> **Bot:**
>
> **✅ Self-Assignable Role Created**
>
> Created role @LFG -- Users can now use `/add` to get this role.
>
> | Created by | Description |
> |------------|-------------|
> | @Officer | Looking for group |

#### `/roles remove` `<role>`

Delete a self-assignable role from both Discord and the database.

#### `/roles list`

List all configured self-assignable roles with descriptions.
