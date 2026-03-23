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
var CameraOrmEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const camera_entity_1 = require("../../../domain/cameras/camera.entity");
let CameraOrmEntity = CameraOrmEntity_1 = class CameraOrmEntity {
    id;
    adminId;
    name;
    ipAddress;
    port;
    username;
    passwordEncrypted;
    rtspPath;
    location;
    isActive;
    createdAt;
    updatedAt;
    static toDomain(entity) {
        const props = {
            adminId: entity.adminId,
            name: entity.name,
            ipAddress: entity.ipAddress,
            port: entity.port,
            username: entity.username,
            passwordEncrypted: entity.passwordEncrypted,
            rtspPath: entity.rtspPath,
            location: entity.location,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
        return camera_entity_1.Camera.restore(entity.id, props);
    }
    static fromDomain(camera) {
        const orm = new CameraOrmEntity_1();
        orm.id = camera.id;
        orm.adminId = camera.adminId;
        orm.name = camera.name;
        orm.ipAddress = camera.ipAddress;
        orm.port = camera.port;
        orm.username = camera.username;
        orm.passwordEncrypted = camera.passwordEncrypted;
        orm.rtspPath = camera.rtspPath;
        orm.location = camera.location ?? null;
        orm.isActive = camera.isActive;
        orm.createdAt = camera.createdAt;
        orm.updatedAt = camera.updatedAt;
        return orm;
    }
};
exports.CameraOrmEntity = CameraOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CameraOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_id', type: 'uuid' }),
    __metadata("design:type", String)
], CameraOrmEntity.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], CameraOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], CameraOrmEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CameraOrmEntity.prototype, "port", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], CameraOrmEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_encrypted', type: 'varchar', length: 512 }),
    __metadata("design:type", String)
], CameraOrmEntity.prototype, "passwordEncrypted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rtsp_path', type: 'varchar', length: 512 }),
    __metadata("design:type", String)
], CameraOrmEntity.prototype, "rtspPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], CameraOrmEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], CameraOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CameraOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CameraOrmEntity.prototype, "updatedAt", void 0);
exports.CameraOrmEntity = CameraOrmEntity = CameraOrmEntity_1 = __decorate([
    (0, typeorm_1.Entity)('cameras')
], CameraOrmEntity);
//# sourceMappingURL=camera.orm-entity.js.map