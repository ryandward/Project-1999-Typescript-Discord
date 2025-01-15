import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Define SharedAccounts first
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

// Now define SharedToons
@Index('shared_toons_pkey', ['Id'], { unique: true })
@Index('shared_toons_name_key', ['Name'], { unique: true })
@Entity('shared_toons', { schema: 'public' })
export class SharedToons {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  Id: number;

  @Column('character varying', { name: 'name', unique: true, length: 255 })
  Name: string;

  @ManyToOne(() => SharedAccounts, accounts => accounts.SharedToons)
  @JoinColumn([{ name: 'account', referencedColumnName: 'Account' }])
  Account: SharedAccounts;
}
