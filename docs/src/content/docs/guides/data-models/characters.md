---
title: "Characters"
description: Guild member character records — census, active toons, and status values.
---

### `census`

The core table. Every registered character (main, alt, bot) gets a row. Commands like `/main`, `/alt`, `/bot` insert here; `/drop` sets `Status` to `"Dropped"`.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `DiscordId` | `text` | Discord snowflake of the owning player |
| `Name` | `text` | In-game character name |
| `CharacterClass` | `text` | EverQuest class (e.g. `"Cleric"`, `"Shadow Knight"`) |
| `Level` | `bigint` | Current level (1–60) |
| `Status` | `text` | `"Main"`, `"Alt"`, `"Bot"`, `"Dropped"`, or `"Probationary"` |
| `Time` | `text` | Creation/update timestamp |

**Used by:** `/main`, `/alt`, `/bot`, `/ding`, `/drop`, `/change`, `/claim`, `/toons`, `/whois`, `/promote`, `/assign`, `/reassign`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Census.ts
@Index('idx_17818_census_pkey', ['Id'], { unique: true })
@Entity('census', { schema: 'public' })
export class Census {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: number;

  @Column('text', { name: 'discord_id' })
  DiscordId: string;

  @Column('text', { name: 'name' })
  Name: string;

  @Column('text', { name: 'character_class' })
  CharacterClass: string;

  @Column('bigint', { name: 'level' })
  Level: number;

  @Column('text', { name: 'status' })
  Status: string;

  @Column('text', { name: 'time' })
  Time: Date;
}
```

</details>

---

### `active_toons` (view)

A read-only view filtering out dropped characters. The TypeORM entity extends `Census`, so it shares the same columns. Most commands and autocomplete helpers query this view instead of `census` directly.

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/ActiveToons.ts
@ViewEntity({
  expression: `
    SELECT *
    FROM census
    WHERE status != 'Dropped'
  `,
})
export class ActiveToons extends Census {}
```

</details>

---

### `status` (view)

A read-only view of distinct status values. Returns one column (`Status`). Used to populate autocomplete dropdowns for status-based filters.

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Status.ts
@ViewEntity({
  expression: `
    SELECT DISTINCT status
    FROM census
  `,
})
export class Status {
  @ViewColumn({ name: 'status' })
  Status: string;
}
```

</details>
