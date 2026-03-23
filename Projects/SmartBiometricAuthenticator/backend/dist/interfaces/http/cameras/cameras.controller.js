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
exports.CamerasController = void 0;
const common_1 = require("@nestjs/common");
const register_camera_usecase_1 = require("../../../application/cameras/use-cases/register-camera.usecase");
const update_camera_usecase_1 = require("../../../application/cameras/use-cases/update-camera.usecase");
const camera_snapshot_service_1 = require("../../../infrastructure/cameras/camera-snapshot.service");
const public_decorator_1 = require("../common/public.decorator");
const register_camera_dto_1 = require("./dto/register-camera.dto");
const update_camera_dto_1 = require("./dto/update-camera.dto");
const HARDCODED_ADMIN_ID = '00000000-0000-0000-0000-000000000001';
let CamerasController = class CamerasController {
    registerCameraUseCase;
    updateCameraUseCase;
    cameraSnapshotService;
    cameraRepository;
    constructor(registerCameraUseCase, updateCameraUseCase, cameraSnapshotService, cameraRepository) {
        this.registerCameraUseCase = registerCameraUseCase;
        this.updateCameraUseCase = updateCameraUseCase;
        this.cameraSnapshotService = cameraSnapshotService;
        this.cameraRepository = cameraRepository;
    }
    async register(dto) {
        const httpPort = dto.port ?? '80';
        const name = dto.name?.trim() || `Cámara ${dto.ipAddress}`;
        const rtspPath = dto.rtspPath?.trim() || '/stream1';
        const camera = await this.registerCameraUseCase.execute({
            adminId: HARDCODED_ADMIN_ID,
            name,
            ipAddress: dto.ipAddress,
            port: Number(httpPort),
            username: dto.username,
            passwordPlain: dto.password,
            rtspPath,
            location: dto.location,
        });
        return {
            id: camera.id,
            name: camera.name,
            ipAddress: camera.ipAddress,
            port: camera.port,
            username: camera.username,
            rtspPath: camera.rtspPath,
            location: camera.location,
            isActive: camera.isActive,
            createdAt: camera.createdAt,
            updatedAt: camera.updatedAt,
        };
    }
    async update(id, dto) {
        const camera = await this.updateCameraUseCase.execute(id, HARDCODED_ADMIN_ID, dto);
        return {
            id: camera.id,
            name: camera.name,
            ipAddress: camera.ipAddress,
            port: camera.port,
            username: camera.username,
            rtspPath: camera.rtspPath,
            location: camera.location,
            isActive: camera.isActive,
            createdAt: camera.createdAt,
            updatedAt: camera.updatedAt,
        };
    }
    async findAll() {
        const cameras = await this.cameraRepository.findByAdmin(HARDCODED_ADMIN_ID);
        return cameras.map((camera) => ({
            id: camera.id,
            name: camera.name,
            ipAddress: camera.ipAddress,
            port: camera.port,
            username: camera.username,
            rtspPath: camera.rtspPath,
            location: camera.location,
            isActive: camera.isActive,
            createdAt: camera.createdAt,
            updatedAt: camera.updatedAt,
        }));
    }
    async snapshot(id, res) {
        const { buffer, contentType } = await this.cameraSnapshotService.fetchSnapshot(id);
        res.setHeader('Content-Type', contentType);
        res.send(buffer);
    }
    async findOne(id) {
        const camera = await this.cameraRepository.findById(id);
        if (!camera) {
            return null;
        }
        return {
            id: camera.id,
            name: camera.name,
            ipAddress: camera.ipAddress,
            port: camera.port,
            username: camera.username,
            rtspPath: camera.rtspPath,
            location: camera.location,
            isActive: camera.isActive,
            createdAt: camera.createdAt,
            updatedAt: camera.updatedAt,
        };
    }
};
exports.CamerasController = CamerasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_camera_dto_1.RegisterCameraDto]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "register", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_camera_dto_1.UpdateCameraDto]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/snapshot'),
    (0, common_1.Header)('Cache-Control', 'no-store'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "snapshot", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "findOne", null);
exports.CamerasController = CamerasController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('cameras'),
    __param(3, (0, common_1.Inject)('CameraRepositoryPort')),
    __metadata("design:paramtypes", [register_camera_usecase_1.RegisterCameraUseCase,
        update_camera_usecase_1.UpdateCameraUseCase,
        camera_snapshot_service_1.CameraSnapshotService, Object])
], CamerasController);
//# sourceMappingURL=cameras.controller.js.map