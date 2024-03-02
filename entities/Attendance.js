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
let Attendance = class Attendance {
    Raid;
    Name;
    Date;
    DiscordId;
    Id;
    Modifier;
};
__decorate([
    Column('text', { name: 'raid', nullable: true }),
    __metadata("design:type", Object)
], Attendance.prototype, "Raid", void 0);
__decorate([
    Column('text', { name: 'name', nullable: true }),
    __metadata("design:type", Object)
], Attendance.prototype, "Name", void 0);
__decorate([
    Column('timestamp without time zone', { name: 'date', nullable: true }),
    __metadata("design:type", Object)
], Attendance.prototype, "Date", void 0);
__decorate([
    Column('text', { name: 'discord_id', nullable: true }),
    __metadata("design:type", Object)
], Attendance.prototype, "DiscordId", void 0);
__decorate([
    PrimaryGeneratedColumn({ type: 'bigint', name: 'id' }),
    __metadata("design:type", String)
], Attendance.prototype, "Id", void 0);
__decorate([
    Column('bigint', { name: 'modifier', nullable: true }),
    __metadata("design:type", Object)
], Attendance.prototype, "Modifier", void 0);
Attendance = __decorate([
    Index('idx_17824_attendance_pkey', ['Id'], { unique: true }),
    Entity('attendance', { schema: 'public' })
], Attendance);
export { Attendance };
