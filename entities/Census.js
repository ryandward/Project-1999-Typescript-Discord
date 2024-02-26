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
let Census = class Census {
    DiscordId;
    Name;
    CharacterClass;
    Level;
    Status;
    Time;
    Id;
};
__decorate([
    Column("text", { name: "discord_id" }),
    __metadata("design:type", String)
], Census.prototype, "DiscordId", void 0);
__decorate([
    Column("text", { name: "name" }),
    __metadata("design:type", String)
], Census.prototype, "Name", void 0);
__decorate([
    Column("text", { name: "character_class" }),
    __metadata("design:type", String)
], Census.prototype, "CharacterClass", void 0);
__decorate([
    Column("bigint", { name: "level" }),
    __metadata("design:type", Number)
], Census.prototype, "Level", void 0);
__decorate([
    Column("text", { name: "status" }),
    __metadata("design:type", String)
], Census.prototype, "Status", void 0);
__decorate([
    Column("text", { name: "time" }),
    __metadata("design:type", Date)
], Census.prototype, "Time", void 0);
__decorate([
    PrimaryGeneratedColumn({ type: "bigint", name: "id" }),
    __metadata("design:type", String)
], Census.prototype, "Id", void 0);
Census = __decorate([
    Index("idx_17818_census_pkey", ["Id"], { unique: true }),
    Index("idx_17818_sqlite_autoindex_census_1", ["Name"], { unique: true }),
    Entity("census", { schema: "public" })
], Census);
export { Census };
