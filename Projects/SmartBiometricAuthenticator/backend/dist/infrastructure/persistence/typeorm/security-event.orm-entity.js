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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityEventOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let SecurityEventOrmEntity = class SecurityEventOrmEntity {
    id;
    type;
    severity;
    cameraId;
    userId;
    accessLogId;
    metadataJson;
    createdAt;
};
exports.SecurityEventOrmEntity = SecurityEventOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SecurityEventOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], SecurityEventOrmEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], SecurityEventOrmEntity.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'camera_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], SecurityEventOrmEntity.prototype, "cameraId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], SecurityEventOrmEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'access_log_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], SecurityEventOrmEntity.prototype, "accessLogId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata_json', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SecurityEventOrmEntity.prototype, "metadataJson", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SecurityEventOrmEntity.prototype, "createdAt", void 0);
exports.SecurityEventOrmEntity = SecurityEventOrmEntity = __decorate([
    (0, typeorm_1.Entity)('security_events')
], SecurityEventOrmEntity);
//# sourceMappingURL=security-event.orm-entity.js.map