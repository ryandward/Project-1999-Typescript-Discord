import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SharedAccounts } from './SharedAccounts.js';

@Index('shared_toons_pkey', ['Id'], { unique: true })
@Index('shared_toons_name_key', ['Name'], { unique: true })
@Entity('shared_toons', { schema: 'public' })
export class SharedToons {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  Id: number;

  @Column('character varying', { name: 'name', unique: true, length: 255 })
  Name: string;

  @Column('character varying', { name: 'role', length: 50 })
  Role: string;

  // eslint-disable-next-line no-shadow
  @ManyToOne(() => SharedAccounts, SharedAccounts => SharedAccounts.SharedToons)
  @JoinColumn([{ name: 'account', referencedColumnName: 'Account' }])
  Account: SharedAccounts;
}
