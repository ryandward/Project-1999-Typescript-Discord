import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('idx_17818_census_pkey', ['Id'], { unique: true })
@Index('idx_17818_sqlite_autoindex_census_1', ['Name'], { unique: true })
@Entity('census', { schema: 'public' })
export class Census {
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

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  Id: string;
}
