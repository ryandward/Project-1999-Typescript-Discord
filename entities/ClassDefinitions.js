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
let ClassDefinitions = class ClassDefinitions {
    ClassName;
    CharacterClass;
    Id;
    LevelAttained;
};
__decorate([
    Column('text', { name: 'class_name' }),
    __metadata("design:type", String)
], ClassDefinitions.prototype, "ClassName", void 0);
__decorate([
    Column('text', { name: 'character_class' }),
    __metadata("design:type", String)
], ClassDefinitions.prototype, "CharacterClass", void 0);
__decorate([
    PrimaryGeneratedColumn({ type: 'bigint', name: 'id' }),
    __metadata("design:type", String)
], ClassDefinitions.prototype, "Id", void 0);
__decorate([
    Column('bigint', { name: 'level_attained' }),
    __metadata("design:type", Number)
], ClassDefinitions.prototype, "LevelAttained", void 0);
ClassDefinitions = __decorate([
    Index('idx_17834_class_definitions_pkey', ['Id'], { unique: true }),
    Entity('class_definitions', { schema: 'public' })
], ClassDefinitions);
export { ClassDefinitions };
