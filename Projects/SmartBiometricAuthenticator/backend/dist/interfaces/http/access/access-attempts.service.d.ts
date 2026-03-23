import { Repository } from 'typeorm';
import { AccessLogOrmEntity } from '@infrastructure/persistence/typeorm/access-log.orm-entity';
import { AlertOrmEntity } from '@infrastructure/persistence/typeorm/alert.orm-entity';
import { SecurityEventOrmEntity } from '@infrastructure/persistence/typeorm/security-event.orm-entity';
import type { CreateAccessAttemptDto } from './dto/create-access-attempt.dto';
export declare class AccessAttemptsService {
    private readonly accessLogs;
    private readonly securityEvents;
    private readonly alerts;
    constructor(accessLogs: Repository<AccessLogOrmEntity>, securityEvents: Repository<SecurityEventOrmEntity>, alerts: Repository<AlertOrmEntity>);
    recordAttempt(dto: CreateAccessAttemptDto): Promise<{
        accessLog: {
            id: string;
            userId: string | null;
            cameraId: string | null;
            outcome: string;
            method: string;
            confidence: number | null;
            metadata: any;
            createdAt: Date;
        };
        securityEvent: {
            id: string;
            type: string;
            severity: string;
            cameraId: string | null;
            userId: string | null;
            accessLogId: string | null;
            metadata: any;
            createdAt: Date;
        };
        alert: {
            id: string;
            securityEventId: string | null;
            type: string;
            status: string;
            message: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } | {
        accessLog: {
            id: string;
            userId: string | null;
            cameraId: string | null;
            outcome: string;
            method: string;
            confidence: number | null;
            metadata: any;
            createdAt: Date;
        };
        securityEvent?: undefined;
        alert?: undefined;
    }>;
    recordCameraVisionDetection(params: {
        cameraId: string;
        detectionType: 'MOTION_DETECTED' | 'PERSON_DETECTED';
        diffRatio: number;
        captureBuffer?: Buffer;
    }): Promise<void>;
    listAccessLogs(limit?: number): Promise<{
        id: string;
        userId: string | null;
        cameraId: string | null;
        outcome: string;
        method: string;
        confidence: number | null;
        metadata: any;
        createdAt: Date;
    }[]>;
    listSecurityEvents(limit?: number): Promise<{
        id: string;
        type: string;
        severity: string;
        cameraId: string | null;
        userId: string | null;
        accessLogId: string | null;
        metadata: any;
        createdAt: Date;
    }[]>;
    listAlerts(limit?: number): Promise<{
        cameraId: string | null;
        captureImageBase64: string | null;
        captureMimeType: string | null;
        id: string;
        securityEventId: string | null;
        type: string;
        status: string;
        message: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateAlert(id: string, status: string, message?: string): Promise<{
        id: string;
        securityEventId: string | null;
        type: string;
        status: string;
        message: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private serializeLog;
    private serializeEvent;
    private serializeAlert;
}
