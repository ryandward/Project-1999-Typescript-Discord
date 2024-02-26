import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_17797_races_pkey", ["Id"], { unique: true })
@Entity("races", { schema: "public" })
export class Races {
  @Column("text", { name: "race", nullable: true })
  Race: string | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  Id: string;
}
