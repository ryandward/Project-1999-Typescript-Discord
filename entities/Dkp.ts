import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_17845_dkp_pkey", ["Id"], { unique: true })
@Entity("dkp", { schema: "public" })
export class Dkp {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  Id: string;

  @Column("text", { name: "discord_name", nullable: true })
  DiscordName: string | null;

  @Column("bigint", { name: "earned_dkp", nullable: true })
  EarnedDkp: string | null;

  @Column("bigint", { name: "spent_dkp", nullable: true })
  SpentDkp: string | null;

  @Column("text", { name: "discord_id", nullable: true })
  DiscordId: string | null;

  @Column("timestamp without time zone", {
    name: "date_joined",
    nullable: true,
  })
  DateJoined: Date | null;
}
