---
title: "Bank & Plat"
description: Guild bank inventory, character inventories, trash filters, and platinum ledger.
---

### `bank`

Guild bank inventory. Each row is one item stack in a banker character's inventory. Populated by bulk import from EverQuest inventory files.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `Banker` | `text` | Banker character holding the item |
| `Location` | `text` | Inventory slot (e.g. `"Bank Slot 3"`) |
| `Name` | `text` | Item name as it appears in-game |
| `EqItemId` | `text` | EverQuest item database ID (for wiki links) |
| `Quantity` | `bigint` | Stack count |
| `Slots` | `bigint` | Raw slot data from inventory export |
| `Time` | `timestamp` | Import timestamp |

**Used by:** `/find`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Bank.ts
@Index('idx_17812_bank_pkey', ['Id'], { unique: true })
@Entity('bank', { schema: 'public' })
export class Bank {
  @Column('text', { name: 'banker' })
  Banker: string;

  @Column('text', { name: 'location' })
  Location: string;

  @Column('text', { name: 'name' })
  Name: string;

  @Column('text', { name: 'eq_item_id' })
  EqItemId: string;

  @Column('bigint', { name: 'quantity' })
  Quantity: number;

  @Column('bigint', { name: 'slots' })
  Slots: string;

  @Column('timestamp without time zone', { name: 'time' })
  Time: Date;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;
}
```

</details>

---

### `inventory`

Per-character inventory snapshots. Same structure as `bank` but tracks individual characters rather than guild bankers.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `Toon` | `text` | Character name who owns the slot |
| `Location` | `text` | Inventory slot location |
| `Name` | `text` | Item name |
| `EqItemId` | `text` | EverQuest item database ID |
| `Quantity` | `bigint` | Stack count |
| `Slots` | `bigint` | Raw slot data |
| `Time` | `timestamp` | Import timestamp |

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Inventory.ts
@Index('idx_17839_inventory_pkey', ['Id'], { unique: true })
@Entity('inventory', { schema: 'public' })
export class Inventory {
  @Column('text', { name: 'toon', nullable: true })
  Toon: string | null;

  @Column('text', { name: 'location', nullable: true })
  Location: string | null;

  @Column('text', { name: 'name', nullable: true })
  Name: string | null;

  @Column('text', { name: 'eq_item_id', nullable: true })
  EqItemId: string | null;

  @Column('bigint', { name: 'quantity', nullable: true })
  Quantity: string | null;

  @Column('bigint', { name: 'slots', nullable: true })
  Slots: string | null;

  @Column('timestamp without time zone', { name: 'time', nullable: true })
  Time: Date | null;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;
}
```

</details>

---

### `trash`

Junk item filter. Items on this list are excluded during bank imports to keep the guild bank clean.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `Name` | `text` | Item name to filter out |

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Trash.ts
@Index('idx_17802_trash_pkey', ['Id'], { unique: true })
@Entity('trash', { schema: 'public' })
export class Trash {
  @Column('text', { name: 'name', nullable: true })
  Name: string | null;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;
}
```

</details>

---

### `plat`

Platinum currency transaction ledger. Each row is a single deposit or withdrawal.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `integer` PK | Auto-generated |
| `DiscordId` | `varchar(255)` | Discord snowflake of the member |
| `Amount` | `integer` | Transaction amount (positive = deposit, negative = withdrawal) |
| `Description` | `varchar` | Human-readable description (e.g. `"Sold Fungi Tunic"`) |
| `TransactionTime` | `timestamptz` | Defaults to `CURRENT_TIMESTAMP` |

**Used by:** `/income`, `/expense`, `/plat`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Plat.ts
@Index('plat_pkey', ['Id'], { unique: true })
@Entity('plat', { schema: 'public' })
export class Plat {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  Id: number;

  @Column('character varying', { name: 'discord_id', length: 255 })
  DiscordId: string;

  @Column('integer', { name: 'amount' })
  Amount: number;

  @Column('timestamp with time zone', {
    name: 'transaction_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  TransactionTime: Date | null;

  @Column('character varying', { name: 'description', nullable: true })
  Description: string | null;
}
```

</details>
