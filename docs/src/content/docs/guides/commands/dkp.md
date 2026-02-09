---
title: "DKP Commands"
description: Track Dragon Kill Points and raid attendance.
---

Dragon Kill Points are earned from raid attendance and spent on loot.

#### `/dkp` `[user]` `[name]`

Check DKP balance. Look up by `@user`, character name, or leave blank for yourself.

> **You:** `/dkp Gortak`
>
> **Bot:**
>
> **🐉 DKP Record** -- @SomePlayer
>
> | 💰 Current DKP | 📜 Total Earned |
> |---|---|
> | 245 | 361 |

Current DKP = Earned - Spent.

---

### Officer Commands

#### `/attendance` `<raid>`

Record raid attendance from EverQuest `/who` logs. Requires `ManageRoles` permission. This is a multi-step interaction:

**Step 1 -- Select a raid.** Autocomplete shows the raid name and DKP value:

```
Fear (5 DKP)
Hate (5 DKP)
Kael Drakkal (5 DKP)
Sebilis (5 DKP)
On Time (2 DKP)
Boss (2 DKP)
Expedition (3 DKP)
```

**Step 2 -- Paste `/who` logs.** A modal dialog opens:

```
[Sun May 12 20:16:36 2024] [60 Grave Lord] Gortak (Iksar) <Guild Name>
[Sun May 12 20:16:36 2024] [60 Sorcerer] Blazewing (Erudite) <Guild Name>
[Sun May 12 20:16:36 2024] [60 Hierophant] Mossgrove (Halfling) <Guild Name>
[Sun May 12 20:16:36 2024] [60 Oracle] Stormcall (Barbarian) <Guild Name>
```

**Step 3 -- Results.** The bot parses names, cross-references with the census, and awards DKP:

> **Bot:**
>
> **🐉 Attendance Recorded**
>
> Gortak, Blazewing, Mossgrove, Stormcall earned `5` DKP for `Fear`
>
> | Recorded | Rejected |
> |----------|----------|
> | 4 | 0 |

Names not found in the census appear under **❓ Unregistered Players**.
