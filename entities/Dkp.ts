import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
