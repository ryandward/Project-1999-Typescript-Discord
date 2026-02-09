---
title: "DKP & Raids"
description: Dragon Kill Points ledger, raid attendance, raid definitions, and loot history.
---

### `dkp`

One row per guild member. Tracks cumulative earned and spent DKP. Current balance = `EarnedDkp - SpentDkp`.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `DiscordId` | `text` | Discord snowflake of the member |
| `DiscordName` | `text` | Display name at record creation |
| `EarnedDkp` | `bigint` | Total DKP earned from raid attendance |
| `SpentDkp` | `bigint` | Total DKP spent on loot claims |
| `DateJoined` | `timestamp` | Date the member joined the guild |

**Used by:** `/dkp`, `/attendance`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Dkp.ts
@Index('idx_17845_dkp_pkey', ['Id'], { unique: true })
@Entity('dkp', { schema: 'public' })
export class Dkp {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: number;

  @Column('text', { name: 'discord_name', nullable: true })
  DiscordName: string;

  @Column('bigint', { name: 'earned_dkp', nullable: true })
  EarnedDkp: number;

  @Column('bigint', { name: 'spent_dkp', nullable: true })
  SpentDkp: number;

  @Column('text', { name: 'discord_id', nullable: true })
  DiscordId: string;

  @Column('timestamp without time zone', {
    name: 'date_joined',
    nullable: true,
  })
  DateJoined: Date;
}
```

</details>

---

### `attendance`

One row per character per raid event. Created in bulk when an officer pastes `/who` logs via the `/attendance` command.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `Raid` | `text` | Raid name (references `raids.Raid`) |
| `Name` | `text` | Character name present at the raid |
| `DiscordId` | `text` | Discord snowflake of the character's owner |
| `Date` | `timestamp` | Attendance timestamp |
| `Modifier` | `bigint` | DKP value copied from `raids.Modifier` |

**Used by:** `/attendance`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Attendance.ts
@Index('idx_17824_attendance_pkey', ['Id'], { unique: true })
@Entity('attendance', { schema: 'public' })
export class Attendance {
  @Column('text', { name: 'raid', nullable: true })
  Raid: string | null;

  @Column('text', { name: 'name', nullable: true })
  Name: string | null;

  @Column('timestamp without time zone', { name: 'date', nullable: true })
  Date: Date | null;

  @Column('text', { name: 'discord_id', nullable: true })
  DiscordId: string | null;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;

  @Column('bigint', { name: 'modifier', nullable: true })
  Modifier: string | null;
}
```

</details>

---

### `raids`

Defines the available raid targets and their DKP values. Populated by officers.

| Column | Type | Notes |
|--------|------|-------|
| `Raid` | `text` **PK** | Raid name (e.g. `"Fear"`, `"Hate"`, `"Kael Drakkal"`) |
| `Type` | `text` | Category (e.g. `"Open World"`, `"Instanced"`) |
| `Modifier` | `bigint` | DKP awarded per attendance |
| `Id` | `bigint` | Numeric ID (not used as PK) |

**Used by:** `/attendance` autocomplete

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Raids.ts
@Entity('raids', { schema: 'public' })
export class Raids {
  @PrimaryColumn('text', { name: 'raid' })
  Raid: string;

  @Column('text', { name: 'type', nullable: true })
  Type: string | null;

  @Column('bigint', { name: 'modifier', nullable: true })
  Modifier: number | null;

  @Column('bigint', { name: 'id', nullable: true })
  Id: number | null;
}
```

</details>

---

### `items`

Loot award history. Each row records a player winning an item and the DKP they spent.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `Name` | `text` | Character name of the winner |
| `DiscordId` | `text` | Discord snowflake of the winner |
| `Item` | `text` | Name of the awarded item |
| `DkpSpent` | `bigint` | DKP spent to win the item |
| `Date` | `timestamp` | Date the item was awarded |

**Used by:** DKP spend tracking and audit

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Items.ts
@Index('idx_17851_items_pkey', ['Id'], { unique: true })
@Entity('items', { schema: 'public' })
export class Items {
  @Column('text', { name: 'name', nullable: true })
  Name: string | null;

  @Column('timestamp without time zone', { name: 'date', nullable: true })
  Date: Date | null;

  @Column('text', { name: 'item', nullable: true })
  Item: string | null;

  @Column('bigint', { name: 'dkp_spent', nullable: true })
  DkpSpent: string | null;

  @Column('text', { name: 'discord_id', nullable: true })
  DiscordId: string | null;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;
}
```

</details>
