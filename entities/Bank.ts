import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_17812_bank_pkey", ["Id"], { unique: true })
@Entity("bank", { schema: "public" })
export class Bank {
  @Column("text", { name: "banker"})
  Banker: string;

  @Column("text", { name: "location"})
  Location: string;

  @Column("text", { name: "name"})
  Name: string;

  @Column("text", { name: "eq_item_id"})
  EqItemId: string;

  @Column("bigint", { name: "quantity"})
  Quantity: number;

  @Column("bigint", { name: "slots"})
  Slots: string;

  @Column("timestamp without time zone", { name: "time"})
  Time: Date;

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  Id: string;
}
