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
exports.BiometricProfileOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const user_orm_entity_1 = require("./user.orm-entity");
let BiometricProfileOrmEntity = class BiometricProfileOrmEntity {
    id;
    userId;
    user;
    faceTemplateRef;
    voiceTemplateRef;
    status;
    createdAt;
    updatedAt;
};
exports.BiometricProfileOrmEntity = BiometricProfileOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BiometricProfileOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], BiometricProfileOrmEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_orm_entity_1.UserOrmEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_orm_entity_1.UserOrmEntity)
], BiometricProfileOrmEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'face_template_ref', type: 'varchar', length: 512, nullable: true }),
    __metadata("design:type", Object)
], BiometricProfileOrmEntity.prototype, "faceTemplateRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'voice_template_ref', type: 'varchar', length: 512, nullable: true }),
    __metadata("design:type", Object)
], BiometricProfileOrmEntity.prototype, "voiceTemplateRef", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 32, default: 'PENDING' }),
    __metadata("design:type", String)
], BiometricProfileOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BiometricProfileOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BiometricProfileOrmEntity.prototype, "updatedAt", void 0);
exports.BiometricProfileOrmEntity = BiometricProfileOrmEntity = __decorate([
    (0, typeorm_1.Entity)('biometric_profiles')
], BiometricProfileOrmEntity);
//# sourceMappingURL=biometric-profile.orm-entity.js.map