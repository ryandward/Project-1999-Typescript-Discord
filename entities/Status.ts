import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  expression: `
    SELECT DISTINCT status
    FROM census
  `,
})
export class Status {
  @ViewColumn({ name: "status" })
  Status: string;
}