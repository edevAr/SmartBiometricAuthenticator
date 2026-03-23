import { Repository } from 'typeorm';
import { Event } from '@domain/events/event.entity';
import { EventRepositoryPort } from '@application/events/ports/event.repository';
import { EventOrmEntity } from './event.orm-entity';
import { CameraOrmEntity } from './camera.orm-entity';
export declare class EventRepositoryAdapter implements EventRepositoryPort {
    private readonly repo;
    private readonly cameraRepo;
    constructor(repo: Repository<EventOrmEntity>, cameraRepo: Repository<CameraOrmEntity>);
    findById(id: string): Promise<Event | null>;
    findLatestByAdmin(adminId: string, limit: number): Promise<Event[]>;
    save(event: Event): Promise<void>;
}
