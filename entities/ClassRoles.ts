import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
