var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
let Inventory = class Inventory {
    Toon;
    Location;
    Name;
    EqItemId;
    Quantity;
    Slots;
    Time;
    Id;
};
__decorate([
    Column('text', { name: 'toon', nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "Toon", void 0);
__decorate([
    Column('text', { name: 'location', nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "Location", void 0);
__decorate([
    Column('text', { name: 'name', nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "Name", void 0);
__decorate([
    Column('text', { name: 'eq_item_id', nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "EqItemId", void 0);
__decorate([
    Column('bigint', { name: 'quantity', nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "Quantity", void 0);
__decorate([
    Column('bigint', { name: 'slots', nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "Slots", void 0);
__decorate([
    Column('timestamp without time zone', { name: 'time', nullable: true }),
    __metadata("design:type", Object)
], Inventory.prototype, "Time", void 0);
__decorate([
    PrimaryGeneratedColumn({ type: 'bigint', name: 'id' }),
    __metadata("design:type", String)
], Inventory.prototype, "Id", void 0);
Inventory = __decorate([
    Index('idx_17839_inventory_pkey', ['Id'], { unique: true }),
    Entity('inventory', { schema: 'public' })
], Inventory);
export { Inventory };
