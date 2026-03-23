import { Repository } from 'typeorm';
import { Camera } from '@domain/cameras/camera.entity';
import { CameraRepositoryPort } from '@application/cameras/ports/camera.repository';
import { CameraOrmEntity } from './camera.orm-entity';
export declare class CameraRepositoryAdapter implements CameraRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<CameraOrmEntity>);
    findById(id: string): Promise<Camera | null>;
    findByAdmin(adminId: string): Promise<Camera[]>;
    save(camera: Camera): Promise<void>;
}
