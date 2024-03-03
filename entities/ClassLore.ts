import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
