import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_17824_attendance_pkey", ["Id"], { unique: true })
@Entity("attendance", { schema: "public" })
export class Attendance {
  @Column("text", { name: "raid", nullable: true })
  Raid: string | null;

  @Column("text", { name: "name", nullable: true })
  Name: string | null;

  @Column("timestamp without time zone", { name: "date", nullable: true })
  Date: Date | null;

  @Column("text", { name: "discord_id", nullable: true })
  DiscordId: string | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  Id: string;

  @Column("bigint", { name: "modifier", nullable: true })
  Modifier: string | null;
}
