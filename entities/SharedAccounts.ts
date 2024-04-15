import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SharedToons } from './SharedToons.js';

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

  // eslint-disable-next-line no-shadow
  @OneToMany(() => SharedToons, SharedToons => SharedToons.Account)
  SharedToons: SharedToons[];
}
