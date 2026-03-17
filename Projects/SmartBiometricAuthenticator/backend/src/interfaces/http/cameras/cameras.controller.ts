import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { RegisterCameraUseCase } from '@application/cameras/use-cases/register-camera.usecase';
import { CameraRepositoryPort } from '@application/cameras/ports/camera.repository';
import { RegisterCameraDto } from './dto/register-camera.dto';

// MVP: adminId fijo hasta tener auth
const HARDCODED_ADMIN_ID = '00000000-0000-0000-0000-000000000001';

@Controller('cameras')
export class CamerasController {
  constructor(
    private readonly registerCameraUseCase: RegisterCameraUseCase,
    @Inject('CameraRepositoryPort')
    private readonly cameraRepository: CameraRepositoryPort,
  ) {}

  @Post()
  async register(@Body() dto: RegisterCameraDto) {
    const camera = await this.registerCameraUseCase.execute({
      adminId: HARDCODED_ADMIN_ID,
      name: dto.name,
      ipAddress: dto.ipAddress,
      port: Number(dto.port),
      username: dto.username,
      passwordPlain: dto.password,
      rtspPath: dto.rtspPath,
      location: dto.location,
    });

    return {
      id: camera.id,
      name: camera.name,
      ipAddress: camera.ipAddress,
      port: camera.port,
      username: camera.username,
      rtspPath: camera.rtspPath,
      location: camera.location,
      isActive: camera.isActive,
      createdAt: camera.createdAt,
      updatedAt: camera.updatedAt,
    };
  }

  @Get()
  async findAll() {
    const cameras = await this.cameraRepository.findByAdmin(HARDCODED_ADMIN_ID);
    return cameras.map((camera) => ({
      id: camera.id,
      name: camera.name,
      ipAddress: camera.ipAddress,
      port: camera.port,
      username: camera.username,
      rtspPath: camera.rtspPath,
      location: camera.location,
      isActive: camera.isActive,
      createdAt: camera.createdAt,
      updatedAt: camera.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const camera = await this.cameraRepository.findById(id);
    if (!camera) {
      return null;
    }

    return {
      id: camera.id,
      name: camera.name,
      ipAddress: camera.ipAddress,
      port: camera.port,
      username: camera.username,
      rtspPath: camera.rtspPath,
      location: camera.location,
      isActive: camera.isActive,
      createdAt: camera.createdAt,
      updatedAt: camera.updatedAt,
    };
  }
}

