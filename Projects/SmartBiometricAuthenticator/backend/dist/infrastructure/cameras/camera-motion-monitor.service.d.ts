import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import type { CameraRepositoryPort } from '@application/cameras/ports/camera.repository';
import type { EventRepositoryPort } from '@application/events/ports/event.repository';
import { AccessAttemptsService } from '../../interfaces/http/access/access-attempts.service';
import { CameraSnapshotService } from './camera-snapshot.service';
export declare class CameraMotionMonitorService implements OnModuleInit, OnModuleDestroy {
    private readonly snapshot;
    private readonly accessAttempts;
    private readonly cameraRepository;
    private readonly eventRepository;
    private readonly logger;
    private interval;
    private readonly lastFrame;
    private readonly lastMotionAt;
    private readonly lastPersonAt;
    private tickRunning;
    constructor(snapshot: CameraSnapshotService, accessAttempts: AccessAttemptsService, cameraRepository: CameraRepositoryPort, eventRepository: EventRepositoryPort);
    onModuleInit(): void;
    onModuleDestroy(): void;
    private safeTick;
    private tick;
}
