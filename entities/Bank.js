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
let Bank = class Bank {
    Banker;
    Location;
    Name;
    EqItemId;
    Quantity;
    Slots;
    Time;
    Id;
};
__decorate([
    Column("text", { name: "banker" }),
    __metadata("design:type", String)
], Bank.prototype, "Banker", void 0);
__decorate([
    Column("text", { name: "location" }),
    __metadata("design:type", String)
], Bank.prototype, "Location", void 0);
__decorate([
    Column("text", { name: "name" }),
    __metadata("design:type", String)
], Bank.prototype, "Name", void 0);
__decorate([
    Column("text", { name: "eq_item_id" }),
    __metadata("design:type", String)
], Bank.prototype, "EqItemId", void 0);
__decorate([
    Column("bigint", { name: "quantity" }),
    __metadata("design:type", Number)
], Bank.prototype, "Quantity", void 0);
__decorate([
    Column("bigint", { name: "slots" }),
    __metadata("design:type", String)
], Bank.prototype, "Slots", void 0);
__decorate([
    Column("timestamp without time zone", { name: "time" }),
    __metadata("design:type", Date)
], Bank.prototype, "Time", void 0);
__decorate([
    PrimaryGeneratedColumn({ type: "bigint", name: "id" }),
    __metadata("design:type", String)
], Bank.prototype, "Id", void 0);
Bank = __decorate([
    Index("idx_17812_bank_pkey", ["Id"], { unique: true }),
    Entity("bank", { schema: "public" })
], Bank);
export { Bank };
