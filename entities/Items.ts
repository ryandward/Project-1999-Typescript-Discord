import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_17851_items_pkey", ["Id"], { unique: true })
@Entity("items", { schema: "public" })
export class Items {
  @Column("text", { name: "name", nullable: true })
  Name: string | null;

  @Column("timestamp without time zone", { name: "date", nullable: true })
  Date: Date | null;

  @Column("text", { name: "item", nullable: true })
  Item: string | null;

  @Column("bigint", { name: "dkp_spent", nullable: true })
  DkpSpent: string | null;

  @Column("text", { name: "discord_id", nullable: true })
  DiscordId: string | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  Id: string;
}
