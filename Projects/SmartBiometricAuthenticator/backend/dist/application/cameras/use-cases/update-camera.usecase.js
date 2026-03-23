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
exports.UpdateCameraUseCase = void 0;
const common_1 = require("@nestjs/common");
let UpdateCameraUseCase = class UpdateCameraUseCase {
    cameraRepository;
    constructor(cameraRepository) {
        this.cameraRepository = cameraRepository;
    }
    encryptPassword(plain) {
        return Buffer.from(plain, 'utf8').toString('base64');
    }
    async execute(id, adminId, dto) {
        const camera = await this.cameraRepository.findById(id);
        if (!camera || camera.adminId !== adminId) {
            throw new common_1.NotFoundException('Cámara no encontrada');
        }
        const patch = {};
        if (dto.name !== undefined) {
            const n = dto.name.trim();
            if (n.length > 0)
                patch.name = n;
        }
        if (dto.ipAddress !== undefined) {
            patch.ipAddress = dto.ipAddress;
        }
        if (dto.port !== undefined && dto.port !== '') {
            patch.port = Number(dto.port);
        }
        if (dto.username !== undefined) {
            const u = dto.username.trim();
            if (u.length > 0)
                patch.username = u;
        }
        if (dto.password !== undefined && dto.password.trim().length > 0) {
            patch.passwordEncrypted = this.encryptPassword(dto.password.trim());
        }
        if (dto.rtspPath !== undefined) {
            const r = dto.rtspPath.trim();
            if (r.length > 0)
                patch.rtspPath = r;
        }
        if (dto.location !== undefined) {
            patch.location = dto.location.trim() || null;
        }
        camera.patchConnection(patch);
        if (dto.isActive !== undefined) {
            camera.setActive(dto.isActive);
        }
        await this.cameraRepository.save(camera);
        return camera;
    }
};
exports.UpdateCameraUseCase = UpdateCameraUseCase;
exports.UpdateCameraUseCase = UpdateCameraUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CameraRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], UpdateCameraUseCase);
//# sourceMappingURL=update-camera.usecase.js.map