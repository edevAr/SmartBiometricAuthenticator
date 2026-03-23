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
var CameraMotionMonitorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraMotionMonitorService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const event_entity_1 = require("../../domain/events/event.entity");
const access_attempts_service_1 = require("../../interfaces/http/access/access-attempts.service");
const camera_snapshot_service_1 = require("./camera-snapshot.service");
const HARDCODED_ADMIN_ID = '00000000-0000-0000-0000-000000000001';
function sampleDiffRatio(prev, nextBuf) {
    if (!prev.length || !nextBuf.length)
        return 0;
    const len = Math.min(prev.length, nextBuf.length, 200_000);
    const targetSamples = 3500;
    const step = Math.max(1, Math.floor(len / targetSamples));
    let diff = 0;
    let n = 0;
    for (let i = 0; i < len; i += step) {
        n++;
        if (prev[i] !== nextBuf[i])
            diff++;
    }
    return n > 0 ? diff / n : 0;
}
function envNumber(name, fallback) {
    const v = process.env[name];
    if (v === undefined || v === '')
        return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
}
let CameraMotionMonitorService = CameraMotionMonitorService_1 = class CameraMotionMonitorService {
    snapshot;
    accessAttempts;
    cameraRepository;
    eventRepository;
    logger = new common_1.Logger(CameraMotionMonitorService_1.name);
    interval = null;
    lastFrame = new Map();
    lastMotionAt = new Map();
    lastPersonAt = new Map();
    tickRunning = false;
    constructor(snapshot, accessAttempts, cameraRepository, eventRepository) {
        this.snapshot = snapshot;
        this.accessAttempts = accessAttempts;
        this.cameraRepository = cameraRepository;
        this.eventRepository = eventRepository;
    }
    onModuleInit() {
        if (process.env.CAMERA_MONITOR_ENABLED === '0') {
            this.logger.log('Monitor de cámaras desactivado (CAMERA_MONITOR_ENABLED=0)');
            return;
        }
        const ms = envNumber('CAMERA_MONITOR_INTERVAL_MS', 12_000);
        this.interval = setInterval(() => {
            void this.safeTick();
        }, ms);
        this.logger.log(`Monitor de cámaras activo (cada ${ms} ms)`);
    }
    onModuleDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    async safeTick() {
        if (this.tickRunning)
            return;
        this.tickRunning = true;
        try {
            await this.tick();
        }
        catch (e) {
            this.logger.warn(`Tick monitor: ${e instanceof Error ? e.message : String(e)}`);
        }
        finally {
            this.tickRunning = false;
        }
    }
    async tick() {
        const motionThreshold = envNumber('CAMERA_MOTION_DIFF', 0.09);
        const personThreshold = envNumber('CAMERA_PERSON_DIFF', 0.24);
        const motionCooldownMs = envNumber('CAMERA_MOTION_COOLDOWN_MS', 45_000);
        const personCooldownMs = envNumber('CAMERA_PERSON_COOLDOWN_MS', 75_000);
        const cameras = await this.cameraRepository.findByAdmin(HARDCODED_ADMIN_ID);
        const active = cameras.filter((c) => c.isActive);
        for (const cam of active) {
            try {
                const { buffer } = await this.snapshot.fetchSnapshot(cam.id);
                const nextBuf = Buffer.from(buffer);
                const prev = this.lastFrame.get(cam.id);
                this.lastFrame.set(cam.id, nextBuf);
                if (!prev?.length)
                    continue;
                const ratio = sampleDiffRatio(prev, nextBuf);
                const now = Date.now();
                if (ratio >= personThreshold) {
                    if (now - (this.lastPersonAt.get(cam.id) ?? 0) < personCooldownMs)
                        continue;
                    this.lastPersonAt.set(cam.id, now);
                    this.lastMotionAt.set(cam.id, now);
                    await this.accessAttempts.recordCameraVisionDetection({
                        cameraId: cam.id,
                        detectionType: 'PERSON_DETECTED',
                        diffRatio: ratio,
                        captureBuffer: nextBuf,
                    });
                    await this.eventRepository.save(event_entity_1.Event.createNew({
                        id: (0, crypto_1.randomUUID)(),
                        cameraId: cam.id,
                        type: event_entity_1.EventType.PERSON_DETECTED,
                        metadataJson: JSON.stringify({ diffRatio: ratio, source: 'camera_monitor' }),
                    }));
                    this.logger.log(`PERSON_DETECTED cámara ${cam.name} (${cam.ipAddress}) ratio=${ratio.toFixed(3)}`);
                }
                else if (ratio >= motionThreshold) {
                    if (now - (this.lastMotionAt.get(cam.id) ?? 0) < motionCooldownMs)
                        continue;
                    this.lastMotionAt.set(cam.id, now);
                    await this.accessAttempts.recordCameraVisionDetection({
                        cameraId: cam.id,
                        detectionType: 'MOTION_DETECTED',
                        diffRatio: ratio,
                        captureBuffer: nextBuf,
                    });
                    await this.eventRepository.save(event_entity_1.Event.createNew({
                        id: (0, crypto_1.randomUUID)(),
                        cameraId: cam.id,
                        type: event_entity_1.EventType.MOTION_DETECTED,
                        metadataJson: JSON.stringify({ diffRatio: ratio, source: 'camera_monitor' }),
                    }));
                    this.logger.log(`MOTION_DETECTED cámara ${cam.name} (${cam.ipAddress}) ratio=${ratio.toFixed(3)}`);
                }
            }
            catch {
            }
        }
    }
};
exports.CameraMotionMonitorService = CameraMotionMonitorService;
exports.CameraMotionMonitorService = CameraMotionMonitorService = CameraMotionMonitorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('CameraRepositoryPort')),
    __param(3, (0, common_1.Inject)('EventRepositoryPort')),
    __metadata("design:paramtypes", [camera_snapshot_service_1.CameraSnapshotService,
        access_attempts_service_1.AccessAttemptsService, Object, Object])
], CameraMotionMonitorService);
//# sourceMappingURL=camera-motion-monitor.service.js.map