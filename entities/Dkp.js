var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
let Dkp = class Dkp {
    Id;
    DiscordName;
    EarnedDkp;
    SpentDkp;
    DiscordId;
    DateJoined;
};
__decorate([
    PrimaryGeneratedColumn({ type: "bigint", name: "id" }),
    __metadata("design:type", String)
], Dkp.prototype, "Id", void 0);
__decorate([
    Column("text", { name: "discord_name", nullable: true }),
    __metadata("design:type", Object)
], Dkp.prototype, "DiscordName", void 0);
__decorate([
    Column("bigint", { name: "earned_dkp", nullable: true }),
    __metadata("design:type", Object)
], Dkp.prototype, "EarnedDkp", void 0);
__decorate([
    Column("bigint", { name: "spent_dkp", nullable: true }),
    __metadata("design:type", Object)
], Dkp.prototype, "SpentDkp", void 0);
__decorate([
    Column("text", { name: "discord_id", nullable: true }),
    __metadata("design:type", Object)
], Dkp.prototype, "DiscordId", void 0);
__decorate([
    Column("timestamp without time zone", {
        name: "date_joined",
        nullable: true,
    }),
    __metadata("design:type", Object)
], Dkp.prototype, "DateJoined", void 0);
Dkp = __decorate([
    Index("idx_17845_dkp_pkey", ["Id"], { unique: true }),
    Entity("dkp", { schema: "public" })
], Dkp);
export { Dkp };
