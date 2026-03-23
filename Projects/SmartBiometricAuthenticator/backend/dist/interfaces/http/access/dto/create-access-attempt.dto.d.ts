export declare class CreateAccessAttemptDto {
    cameraId?: string;
    userId?: string;
    outcome: 'GRANTED' | 'DENIED' | 'UNKNOWN';
    method: 'FACIAL' | 'VOICE' | 'BOTH' | 'PIN';
    confidence?: number;
    metadata?: Record<string, unknown>;
}
