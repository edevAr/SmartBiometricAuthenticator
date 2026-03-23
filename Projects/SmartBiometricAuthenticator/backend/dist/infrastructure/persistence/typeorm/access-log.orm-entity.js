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
exports.AccessLogOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let AccessLogOrmEntity = class AccessLogOrmEntity {
    id;
    userId;
    cameraId;
    outcome;
    method;
    confidence;
    metadataJson;
    createdAt;
};
exports.AccessLogOrmEntity = AccessLogOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AccessLogOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], AccessLogOrmEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'camera_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], AccessLogOrmEntity.prototype, "cameraId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], AccessLogOrmEntity.prototype, "outcome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32 }),
    __metadata("design:type", String)
], AccessLogOrmEntity.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 6, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], AccessLogOrmEntity.prototype, "confidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata_json', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], AccessLogOrmEntity.prototype, "metadataJson", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AccessLogOrmEntity.prototype, "createdAt", void 0);
exports.AccessLogOrmEntity = AccessLogOrmEntity = __decorate([
    (0, typeorm_1.Entity)('access_logs')
], AccessLogOrmEntity);
//# sourceMappingURL=access-log.orm-entity.js.map