import { EntityBase } from '../common/entity.base';
export declare enum CameraProtocol {
    RTSP = "RTSP"
}
export interface CameraProps {
    adminId: string;
    name: string;
    ipAddress: string;
    port: number;
    username: string;
    passwordEncrypted: string;
    rtspPath: string;
    location?: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Camera extends EntityBase<string> {
    private props;
    private constructor();
    static createNew(params: {
        id: string;
        adminId: string;
        name: string;
        ipAddress: string;
        port: number;
        username: string;
        passwordEncrypted: string;
        rtspPath: string;
        location?: string | null;
    }): Camera;
    static restore(id: string, props: CameraProps): Camera;
    get adminId(): string;
    get name(): string;
    get ipAddress(): string;
    get port(): number;
    get username(): string;
    get passwordEncrypted(): string;
    get rtspPath(): string;
    get location(): string | null | undefined;
    get isActive(): boolean;
    get createdAt(): Date;
    get updatedAt(): Date;
    deactivate(): void;
    rename(name: string): void;
    move(location?: string | null): void;
    patchConnection(patch: {
        name?: string;
        ipAddress?: string;
        port?: number;
        username?: string;
        passwordEncrypted?: string;
        rtspPath?: string;
        location?: string | null;
    }): void;
    setActive(active: boolean): void;
    private touch;
}
