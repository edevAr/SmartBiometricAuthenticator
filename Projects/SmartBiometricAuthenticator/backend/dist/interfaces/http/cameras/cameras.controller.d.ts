import type { Response } from 'express';
import { RegisterCameraUseCase } from '@application/cameras/use-cases/register-camera.usecase';
import { UpdateCameraUseCase } from '@application/cameras/use-cases/update-camera.usecase';
import type { CameraRepositoryPort } from '@application/cameras/ports/camera.repository';
import { CameraSnapshotService } from '@infrastructure/cameras/camera-snapshot.service';
import { RegisterCameraDto } from './dto/register-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
export declare class CamerasController {
    private readonly registerCameraUseCase;
    private readonly updateCameraUseCase;
    private readonly cameraSnapshotService;
    private readonly cameraRepository;
    constructor(registerCameraUseCase: RegisterCameraUseCase, updateCameraUseCase: UpdateCameraUseCase, cameraSnapshotService: CameraSnapshotService, cameraRepository: CameraRepositoryPort);
    register(dto: RegisterCameraDto): Promise<{
        id: string;
        name: string;
        ipAddress: string;
        port: number;
        username: string;
        rtspPath: string;
        location: string | null | undefined;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateCameraDto): Promise<{
        id: string;
        name: string;
        ipAddress: string;
        port: number;
        username: string;
        rtspPath: string;
        location: string | null | undefined;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        ipAddress: string;
        port: number;
        username: string;
        rtspPath: string;
        location: string | null | undefined;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    snapshot(id: string, res: Response): Promise<void>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        ipAddress: string;
        port: number;
        username: string;
        rtspPath: string;
        location: string | null | undefined;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
