import { Column, Entity, PrimaryColumn } from 'typeorm';

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
