import { Event, EventType } from '@domain/events/event.entity';
import { CameraOrmEntity } from './camera.orm-entity';
export declare class EventOrmEntity {
    id: string;
    cameraId: string;
    camera: CameraOrmEntity;
    contactId: string | null;
    type: EventType;
    detectedAt: Date;
    metadataJson: string | null;
    static toDomain(entity: EventOrmEntity): Event;
    static fromDomain(event: Event): EventOrmEntity;
}
