import { Camera } from '@domain/cameras/camera.entity';
import type { CameraRepositoryPort } from '@application/cameras/ports/camera.repository';
export interface RegisterCameraCommand {
    adminId: string;
    name: string;
    ipAddress: string;
    port: number;
    username: string;
    passwordPlain: string;
    rtspPath: string;
    location?: string | null;
}
export declare class RegisterCameraUseCase {
    private readonly cameraRepository;
    constructor(cameraRepository: CameraRepositoryPort);
    private encryptPassword;
    execute(command: RegisterCameraCommand): Promise<Camera>;
}
