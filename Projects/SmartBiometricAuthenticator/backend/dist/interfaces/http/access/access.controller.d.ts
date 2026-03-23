import { AccessAttemptsService } from './access-attempts.service';
import { CreateAccessAttemptDto } from './dto/create-access-attempt.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
export declare class AccessController {
    private readonly accessService;
    constructor(accessService: AccessAttemptsService);
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
    listLogs(limit?: string): Promise<{
        id: string;
        userId: string | null;
        cameraId: string | null;
        outcome: string;
        method: string;
        confidence: number | null;
        metadata: any;
        createdAt: Date;
    }[]>;
    listSecurityEvents(limit?: string): Promise<{
        id: string;
        type: string;
        severity: string;
        cameraId: string | null;
        userId: string | null;
        accessLogId: string | null;
        metadata: any;
        createdAt: Date;
    }[]>;
    listAlerts(limit?: string): Promise<{
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
    updateAlert(id: string, dto: UpdateAlertDto): Promise<{
        id: string;
        securityEventId: string | null;
        type: string;
        status: string;
        message: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
