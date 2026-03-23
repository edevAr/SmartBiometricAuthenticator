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
exports.EventRepositoryAdapter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_orm_entity_1 = require("./event.orm-entity");
const camera_orm_entity_1 = require("./camera.orm-entity");
let EventRepositoryAdapter = class EventRepositoryAdapter {
    repo;
    cameraRepo;
    constructor(repo, cameraRepo) {
        this.repo = repo;
        this.cameraRepo = cameraRepo;
    }
    async findById(id) {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? event_orm_entity_1.EventOrmEntity.toDomain(entity) : null;
    }
    async findLatestByAdmin(adminId, limit) {
        const qb = this.repo
            .createQueryBuilder('event')
            .innerJoin(camera_orm_entity_1.CameraOrmEntity, 'camera', 'camera.id = event.camera_id')
            .where('camera.admin_id = :adminId', { adminId })
            .orderBy('event.detected_at', 'DESC')
            .limit(limit);
        const entities = await qb.getMany();
        return entities.map(event_orm_entity_1.EventOrmEntity.toDomain);
    }
    async save(event) {
        const entity = event_orm_entity_1.EventOrmEntity.fromDomain(event);
        await this.repo.save(entity);
    }
};
exports.EventRepositoryAdapter = EventRepositoryAdapter;
exports.EventRepositoryAdapter = EventRepositoryAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_orm_entity_1.EventOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(camera_orm_entity_1.CameraOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventRepositoryAdapter);
//# sourceMappingURL=event.repository.adapter.js.map