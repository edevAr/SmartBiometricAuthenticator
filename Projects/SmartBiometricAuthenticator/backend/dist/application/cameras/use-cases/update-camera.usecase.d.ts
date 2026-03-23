import { Camera } from '@domain/cameras/camera.entity';
import type { CameraRepositoryPort } from '@application/cameras/ports/camera.repository';
import type { UpdateCameraDto } from '../../../interfaces/http/cameras/dto/update-camera.dto';
export declare class UpdateCameraUseCase {
    private readonly cameraRepository;
    constructor(cameraRepository: CameraRepositoryPort);
    private encryptPassword;
    execute(id: string, adminId: string, dto: UpdateCameraDto): Promise<Camera>;
}
