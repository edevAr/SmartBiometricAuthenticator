"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContactOrmEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const contact_entity_1 = require("../../../domain/contacts/contact.entity");
let ContactOrmEntity = ContactOrmEntity_1 = class ContactOrmEntity {
    id;
    adminId;
    name;
    relationship;
    email;
    phone;
    isActive;
    createdAt;
    updatedAt;
    static toDomain(entity) {
        const props = {
            adminId: entity.adminId,
            name: entity.name,
            relationship: entity.relationship,
            email: entity.email,
            phone: entity.phone,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
        return contact_entity_1.Contact.restore(entity.id, props);
    }
    static fromDomain(contact) {
        const orm = new ContactOrmEntity_1();
        orm.id = contact.id;
        orm.adminId = contact.adminId;
        orm.name = contact.name;
        orm.relationship = contact.relationship;
        orm.email = contact.email ?? null;
        orm.phone = contact.phone ?? null;
        orm.isActive = contact.isActive;
        orm.createdAt = contact.createdAt;
        orm.updatedAt = contact.updatedAt;
        return orm;
    }
};
exports.ContactOrmEntity = ContactOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContactOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_id', type: 'uuid' }),
    __metadata("design:type", String)
], ContactOrmEntity.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ContactOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], ContactOrmEntity.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], ContactOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32, nullable: true }),
    __metadata("design:type", Object)
], ContactOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ContactOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ContactOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ContactOrmEntity.prototype, "updatedAt", void 0);
exports.ContactOrmEntity = ContactOrmEntity = ContactOrmEntity_1 = __decorate([
    (0, typeorm_1.Entity)('trusted_contacts')
], ContactOrmEntity);
//# sourceMappingURL=contact.orm-entity.js.map