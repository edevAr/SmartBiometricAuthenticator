export declare class AccessLogOrmEntity {
    id: string;
    userId: string | null;
    cameraId: string | null;
    outcome: string;
    method: string;
    confidence: string | null;
    metadataJson: string | null;
    createdAt: Date;
}
