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
var EventOrmEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("../../../domain/events/event.entity");
const camera_orm_entity_1 = require("./camera.orm-entity");
let EventOrmEntity = EventOrmEntity_1 = class EventOrmEntity {
    id;
    cameraId;
    camera;
    contactId;
    type;
    detectedAt;
    metadataJson;
    static toDomain(entity) {
        const props = {
            cameraId: entity.cameraId,
            contactId: entity.contactId,
            type: entity.type,
            detectedAt: entity.detectedAt,
            metadataJson: entity.metadataJson,
        };
        return event_entity_1.Event.restore(entity.id, props);
    }
    static fromDomain(event) {
        const orm = new EventOrmEntity_1();
        orm.id = event.id;
        orm.cameraId = event.cameraId;
        orm.contactId = event.contactId ?? null;
        orm.type = event.type;
        orm.detectedAt = event.detectedAt;
        orm.metadataJson = event.metadataJson ?? null;
        return orm;
    }
};
exports.EventOrmEntity = EventOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EventOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'camera_id', type: 'uuid' }),
    __metadata("design:type", String)
], EventOrmEntity.prototype, "cameraId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => camera_orm_entity_1.CameraOrmEntity),
    (0, typeorm_1.JoinColumn)({ name: 'camera_id' }),
    __metadata("design:type", camera_orm_entity_1.CameraOrmEntity)
], EventOrmEntity.prototype, "camera", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], EventOrmEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'detected_at' }),
    __metadata("design:type", Date)
], EventOrmEntity.prototype, "detectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata_json', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "metadataJson", void 0);
exports.EventOrmEntity = EventOrmEntity = EventOrmEntity_1 = __decorate([
    (0, typeorm_1.Entity)('events')
], EventOrmEntity);
//# sourceMappingURL=event.orm-entity.js.map