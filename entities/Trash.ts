import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_17802_trash_pkey", ["Id"], { unique: true })
@Entity("trash", { schema: "public" })
export class Trash {
  @Column("text", { name: "name", nullable: true })
  Name: string | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  Id: string;
}
