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
exports.AccessAttemptsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const access_log_orm_entity_1 = require("../../../infrastructure/persistence/typeorm/access-log.orm-entity");
const alert_orm_entity_1 = require("../../../infrastructure/persistence/typeorm/alert.orm-entity");
const security_event_orm_entity_1 = require("../../../infrastructure/persistence/typeorm/security-event.orm-entity");
let AccessAttemptsService = class AccessAttemptsService {
    accessLogs;
    securityEvents;
    alerts;
    constructor(accessLogs, securityEvents, alerts) {
        this.accessLogs = accessLogs;
        this.securityEvents = securityEvents;
        this.alerts = alerts;
    }
    async recordAttempt(dto) {
        const log = this.accessLogs.create({
            userId: dto.userId ?? null,
            cameraId: dto.cameraId ?? null,
            outcome: dto.outcome,
            method: dto.method,
            confidence: dto.confidence !== undefined && dto.confidence !== null
                ? String(dto.confidence)
                : null,
            metadataJson: dto.metadata ? JSON.stringify(dto.metadata) : null,
        });
        await this.accessLogs.save(log);
        if (dto.outcome !== 'GRANTED') {
            const severity = dto.outcome === 'DENIED' ? 'HIGH' : 'MEDIUM';
            const evt = this.securityEvents.create({
                type: 'UNAUTHORIZED_ACCESS',
                severity,
                cameraId: dto.cameraId ?? null,
                userId: dto.userId ?? null,
                accessLogId: log.id,
                metadataJson: log.metadataJson,
            });
            await this.securityEvents.save(evt);
            const alert = this.alerts.create({
                securityEventId: evt.id,
                type: 'UNAUTHORIZED_ACCESS',
                status: 'OPEN',
                message: `Acceso no autorizado (${dto.outcome}) vía ${dto.method}${dto.confidence != null ? ` — confianza ${dto.confidence}%` : ''}`,
            });
            await this.alerts.save(alert);
            return {
                accessLog: this.serializeLog(log),
                securityEvent: this.serializeEvent(evt),
                alert: this.serializeAlert(alert),
            };
        }
        return { accessLog: this.serializeLog(log) };
    }
    async recordCameraVisionDetection(params) {
        const { cameraId, detectionType, diffRatio, captureBuffer } = params;
        const severity = detectionType === 'PERSON_DETECTED' ? 'HIGH' : 'MEDIUM';
        const message = detectionType === 'PERSON_DETECTED'
            ? 'Posible persona: cambio visual importante en la escena de la cámara'
            : 'Movimiento detectado en la imagen de la cámara';
        const maxCaptureBytes = 512_000;
        const captureImageBase64 = captureBuffer && captureBuffer.length > 0 && captureBuffer.length <= maxCaptureBytes
            ? captureBuffer.toString('base64')
            : undefined;
        const evt = this.securityEvents.create({
            type: detectionType,
            severity,
            cameraId,
            userId: null,
            accessLogId: null,
            metadataJson: JSON.stringify({
                source: 'camera_frame_diff',
                diffRatio: Math.round(diffRatio * 1000) / 1000,
                ...(captureImageBase64 ? { captureImageBase64, captureMimeType: 'image/jpeg' } : {}),
            }),
        });
        await this.securityEvents.save(evt);
        const alert = this.alerts.create({
            securityEventId: evt.id,
            type: detectionType,
            status: 'OPEN',
            message,
        });
        await this.alerts.save(alert);
    }
    async listAccessLogs(limit = 100) {
        const rows = await this.accessLogs.find({
            order: { createdAt: 'DESC' },
            take: Math.min(limit, 500),
        });
        return rows.map((r) => this.serializeLog(r));
    }
    async listSecurityEvents(limit = 100) {
        const rows = await this.securityEvents.find({
            order: { createdAt: 'DESC' },
            take: Math.min(limit, 500),
        });
        return rows.map((r) => this.serializeEvent(r));
    }
    async listAlerts(limit = 100) {
        const rows = await this.alerts.find({
            order: { createdAt: 'DESC' },
            take: Math.min(limit, 500),
        });
        const secIds = rows
            .map((r) => r.securityEventId)
            .filter((id) => Boolean(id));
        const bySec = new Map();
        if (secIds.length) {
            const evts = await this.securityEvents.findBy({ id: (0, typeorm_2.In)(secIds) });
            evts.forEach((e) => bySec.set(e.id, e));
        }
        return rows.map((r) => {
            const sec = r.securityEventId ? bySec.get(r.securityEventId) : undefined;
            const meta = sec?.metadataJson != null && sec.metadataJson !== ''
                ? JSON.parse(sec.metadataJson)
                : null;
            const captureImageBase64 = typeof meta?.captureImageBase64 === 'string' ? meta.captureImageBase64 : null;
            const captureMimeType = captureImageBase64
                ? typeof meta?.captureMimeType === 'string'
                    ? meta.captureMimeType
                    : 'image/jpeg'
                : null;
            return {
                ...this.serializeAlert(r),
                cameraId: sec?.cameraId ?? null,
                captureImageBase64,
                captureMimeType,
            };
        });
    }
    async updateAlert(id, status, message) {
        const alert = await this.alerts.findOne({ where: { id } });
        if (!alert) {
            throw new common_1.NotFoundException('Alerta no encontrada');
        }
        alert.status = status;
        if (message !== undefined)
            alert.message = message;
        await this.alerts.save(alert);
        return this.serializeAlert(alert);
    }
    serializeLog(log) {
        return {
            id: log.id,
            userId: log.userId,
            cameraId: log.cameraId,
            outcome: log.outcome,
            method: log.method,
            confidence: log.confidence != null ? Number(log.confidence) : null,
            metadata: log.metadataJson ? JSON.parse(log.metadataJson) : null,
            createdAt: log.createdAt,
        };
    }
    serializeEvent(evt) {
        return {
            id: evt.id,
            type: evt.type,
            severity: evt.severity,
            cameraId: evt.cameraId,
            userId: evt.userId,
            accessLogId: evt.accessLogId,
            metadata: evt.metadataJson ? JSON.parse(evt.metadataJson) : null,
            createdAt: evt.createdAt,
        };
    }
    serializeAlert(a) {
        return {
            id: a.id,
            securityEventId: a.securityEventId,
            type: a.type,
            status: a.status,
            message: a.message,
            createdAt: a.createdAt,
            updatedAt: a.updatedAt,
        };
    }
};
exports.AccessAttemptsService = AccessAttemptsService;
exports.AccessAttemptsService = AccessAttemptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(access_log_orm_entity_1.AccessLogOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(security_event_orm_entity_1.SecurityEventOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(alert_orm_entity_1.AlertOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccessAttemptsService);
//# sourceMappingURL=access-attempts.service.js.map