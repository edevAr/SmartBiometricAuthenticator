export declare class SecurityEventOrmEntity {
    id: string;
    type: string;
    severity: string;
    cameraId: string | null;
    userId: string | null;
    accessLogId: string | null;
    metadataJson: string | null;
    createdAt: Date;
}
