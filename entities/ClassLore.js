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
let ClassLore = class ClassLore {
    CharacterClass;
    Description;
    Id;
};
__decorate([
    Column("text", { name: "character_class", nullable: true }),
    __metadata("design:type", Object)
], ClassLore.prototype, "CharacterClass", void 0);
__decorate([
    Column("text", { name: "description", nullable: true }),
    __metadata("design:type", Object)
], ClassLore.prototype, "Description", void 0);
__decorate([
    PrimaryGeneratedColumn({ type: "bigint", name: "id" }),
    __metadata("design:type", String)
], ClassLore.prototype, "Id", void 0);
ClassLore = __decorate([
    Index("idx_17829_class_lore_pkey", ["Id"], { unique: true }),
    Entity("class_lore", { schema: "public" })
], ClassLore);
export { ClassLore };
