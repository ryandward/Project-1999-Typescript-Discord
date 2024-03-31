import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
