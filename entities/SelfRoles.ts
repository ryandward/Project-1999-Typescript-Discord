import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
