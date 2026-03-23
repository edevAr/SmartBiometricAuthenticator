import { Camera } from '@domain/cameras/camera.entity';
export declare class CameraOrmEntity {
    id: string;
    adminId: string;
    name: string;
    ipAddress: string;
    port: number;
    username: string;
    passwordEncrypted: string;
    rtspPath: string;
    location: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    static toDomain(entity: CameraOrmEntity): Camera;
    static fromDomain(camera: Camera): CameraOrmEntity;
}
