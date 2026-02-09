---
title: "Game Reference"
description: Static EverQuest lookup tables — class definitions, lore, class-to-role mappings, and races.
---

These are mostly static reference tables seeded once and rarely modified.

### `class_definitions`

Maps EverQuest class titles to level thresholds. When a character levels up via `/ding`, the bot checks this table to announce title changes (e.g. a Cleric reaching level 51 becomes a "Templar").

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `CharacterClass` | `text` | Base class (e.g. `"Cleric"`) |
| `ClassName` | `text` | Title at this level (e.g. `"Templar"`) |
| `LevelAttained` | `bigint` | Minimum level for this title |

**Used by:** `/ding`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/ClassDefinitions.ts
@Index('idx_17834_class_definitions_pkey', ['Id'], { unique: true })
@Entity('class_definitions', { schema: 'public' })
export class ClassDefinitions {
  @Column('text', { name: 'class_name' })
  ClassName: string;

  @Column('text', { name: 'character_class' })
  CharacterClass: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;

  @Column('bigint', { name: 'level_attained' })
  LevelAttained: number;
}
```

</details>

---

### `class_lore`

Flavour text for each EverQuest class. Displayed in informational embeds.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `CharacterClass` | `text` | EverQuest class name |
| `Description` | `text` | Lore/flavour description |

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/ClassLore.ts
@Index('idx_17829_class_lore_pkey', ['Id'], { unique: true })
@Entity('class_lore', { schema: 'public' })
export class ClassLore {
  @Column('text', { name: 'character_class', nullable: true })
  CharacterClass: string | null;

  @Column('text', { name: 'description', nullable: true })
  Description: string | null;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;
}
```

</details>

---

### `class_roles`

Maps EverQuest classes to Discord roles. When a character is registered via `/main`, `/alt`, or `/bot`, the bot auto-assigns the corresponding Discord role.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `CharacterClass` | `text` | EverQuest class name (e.g. `"Warrior"`) |
| `RoleId` | `bigint` | Discord role snowflake ID to assign |

**Used by:** `/main`, `/alt`, `/bot`, `/claim`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/ClassRoles.ts
@Index('idx_17857_class_roles_pkey', ['Id'], { unique: true })
@Entity('class_roles', { schema: 'public' })
export class ClassRoles {
  @Column('text', { name: 'character_class', nullable: true })
  CharacterClass: string | null;

  @Column('bigint', { name: 'role_id', nullable: true })
  RoleId: string | null;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;
}
```

</details>

---

### `races`

Lookup table of valid EverQuest playable races. Used for validation during character registration.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `Race` | `text` | Race name (e.g. `"Human"`, `"Dark Elf"`, `"Ogre"`) |

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/Races.ts
@Index('idx_17797_races_pkey', ['Id'], { unique: true })
@Entity('races', { schema: 'public' })
export class Races {
  @Column('text', { name: 'race', nullable: true })
  Race: string | null;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;
}
```

</details>
