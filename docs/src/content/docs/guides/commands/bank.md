---
title: "Bank Commands"
description: Guild bank inventory and platinum ledger.
---

#### `/find` `<item>`

Search the guild bank. Autocomplete shows matching items with quantity:

```
(3x) Cloak of Flames
(1x) Circlet of Shadow
(2x) Crystal Chitin Shield
```

> **You:** `/find Cloak of Flames`
>
> **Bot:**
>
> **🏦 Bank Record** -- **Cloak of Flames**
>
> **👤 Bankchar** -- 2 matching item(s)
>
> | 🔍 Location | 💰 Stack |
> |----------|-------|
> | Bank Slot 3 | 1 |
> | Bank Slot 7 | 1 |
>
> `[Request]` `[Cancel]`

Clicking **Request** opens a dropdown of your registered characters. After selecting one, the bot posts a request in the bank channel tagging the bankers.

---

### Officer Commands

These require `ManageGuild` permission.

#### `/income` `<amount>` `<description>`

Record a platinum deposit.

> **You:** `/income 5000 Sold Fungi Tunic`
>
> **Bot:**
>
> **Income Ledger Entry** -- @Officer recorded an income.
>
> | 📜 Description | 💰 Plat |
> |---|---|
> | Sold Fungi Tunic | 5,000 |

#### `/expense` `<amount>` `<description>`

Record a platinum withdrawal.

> **You:** `/expense 12000 Purchased Torpor spell`
>
> **Bot:**
>
> **Expense Ledger Entry** -- @Officer recorded an expense.
>
> | 📜 Description | 💸 Plat |
> |---|---|
> | Purchased Torpor spell | 12,000 |

#### `/plat` `[amount]`

Check or set the guild's platinum balance.

> **You:** `/plat`
>
> **Bot:**
>
> **Guild Plat Balance**
>
> The current guild plat balance is **143,250** plat.

With an amount argument, adjusts the balance directly.
