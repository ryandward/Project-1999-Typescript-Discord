import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_17839_inventory_pkey", ["Id"], { unique: true })
@Entity("inventory", { schema: "public" })
export class Inventory {
  @Column("text", { name: "toon", nullable: true })
  Toon: string | null;

  @Column("text", { name: "location", nullable: true })
  Location: string | null;

  @Column("text", { name: "name", nullable: true })
  Name: string | null;

  @Column("text", { name: "eq_item_id", nullable: true })
  EqItemId: string | null;

  @Column("bigint", { name: "quantity", nullable: true })
  Quantity: string | null;

  @Column("bigint", { name: "slots", nullable: true })
  Slots: string | null;

  @Column("timestamp without time zone", { name: "time", nullable: true })
  Time: Date | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  Id: string;
}
