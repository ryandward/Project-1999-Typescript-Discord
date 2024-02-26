import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_17834_class_definitions_pkey", ["Id"], { unique: true })
@Entity("class_definitions", { schema: "public" })
export class ClassDefinitions {
  @Column("text", { name: "class_name"})
  ClassName: string;

  @Column("text", { name: "character_class"})
  CharacterClass: string;

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  Id: string;

  @Column("bigint", { name: "level_attained" })
  LevelAttained: number;
}
