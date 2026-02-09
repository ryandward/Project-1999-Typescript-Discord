---
title: "Shared Accounts & Roles"
description: Shared guild EverQuest accounts and self-assignable Discord roles.
---

### `shared_accounts`

Guild-owned EverQuest accounts (e.g. buff bots, traders). This is the only table involved in a foreign-key relationship.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `integer` PK | Auto-generated |
| `Account` | `varchar(255)` UNIQUE | Login account name |
| `Password` | `varchar(255)` | Account password |
| `Role` | `varchar(50)` | Required Discord role to view credentials (e.g. `"Officer"`) |

**Relationship:** One account has many toons (`shared_toons`).

**Used by:** `/account`, `/listaccounts`, `/login`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/SharedModels.ts
@Index('shared_accounts_account_key', ['Account'], { unique: true })
@Index('shared_accounts_pkey', ['Id'], { unique: true })
@Entity('shared_accounts', { schema: 'public' })
export class SharedAccounts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  Id: number;

  @Column('character varying', { name: 'account', unique: true, length: 255 })
  Account: string;

  @Column('character varying', { name: 'password', length: 255 })
  Password: string;

  @Column('character varying', { name: 'role', length: 50 })
  Role: string;

  @OneToMany(() => SharedToons, toon => toon.Account)
  SharedToons: SharedToons[];
}
```

</details>

---

### `shared_toons`

Characters on shared accounts. Each toon belongs to exactly one `shared_accounts` row.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `integer` PK | Auto-generated |
| `Name` | `varchar(255)` UNIQUE | In-game character name |
| `Notes` | `text` | Free-text notes (class, gear, purpose) |
| `account` | FK → `shared_accounts.Account` | Owning account |

**Relationship:** Many toons belong to one account (ManyToOne with JoinColumn on `account`).

**Used by:** `/browse`, `/login`, `/note`, `/delete_shared_toon`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/SharedModels.ts
@Index('shared_toons_pkey', ['Id'], { unique: true })
@Index('shared_toons_name_key', ['Name'], { unique: true })
@Entity('shared_toons', { schema: 'public' })
export class SharedToons {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  Id: number;

  @Column('character varying', { name: 'name', unique: true, length: 255 })
  Name: string;

  @Column('text', { name: 'notes', nullable: true })
  Notes: string | null;

  @ManyToOne(() => SharedAccounts, accounts => accounts.SharedToons)
  @JoinColumn([{ name: 'account', referencedColumnName: 'Account' }])
  Account: SharedAccounts;
}
```

</details>

---

### `self_roles`

Self-assignable Discord roles that members can add/remove on themselves.

| Column | Type | Notes |
|--------|------|-------|
| `Id` | `bigint` PK | Auto-generated |
| `RoleId` | `bigint` UNIQUE | Discord role snowflake ID |
| `RoleName` | `text` | Display name for selection menus |
| `Description` | `text` | Description shown when browsing roles |

**Used by:** `/add`, `/remove`, `/roles`

<details>
<summary>TypeORM Entity</summary>

```ts
// entities/SelfRoles.ts
@Index('idx_self_roles_pkey', ['Id'], { unique: true })
@Entity('self_roles', { schema: 'public' })
export class SelfRoles {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;

  @Column('bigint', { name: 'role_id', unique: true })
  RoleId: string;

  @Column('text', { name: 'role_name' })
  RoleName: string;

  @Column('text', { name: 'description', nullable: true })
  Description: string | null;
}
```

</details>
