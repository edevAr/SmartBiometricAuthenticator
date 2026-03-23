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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_orm_entity_1 = require("./contact.orm-entity");
let ContactRepositoryAdapter = class ContactRepositoryAdapter {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findById(id) {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? contact_orm_entity_1.ContactOrmEntity.toDomain(entity) : null;
    }
    async findByAdmin(adminId) {
        const entities = await this.repo.find({ where: { adminId } });
        return entities.map(contact_orm_entity_1.ContactOrmEntity.toDomain);
    }
    async save(contact) {
        const entity = contact_orm_entity_1.ContactOrmEntity.fromDomain(contact);
        await this.repo.save(entity);
    }
    async remove(contact) {
        await this.repo.delete({ id: contact.id });
    }
};
exports.ContactRepositoryAdapter = ContactRepositoryAdapter;
exports.ContactRepositoryAdapter = ContactRepositoryAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_orm_entity_1.ContactOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactRepositoryAdapter);
//# sourceMappingURL=contact.repository.adapter.js.map