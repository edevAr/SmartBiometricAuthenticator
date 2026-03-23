import { Event } from '@domain/events/event.entity';
import type { EventRepositoryPort } from '@application/events/ports/event.repository';
export interface ListLatestEventsQuery {
    adminId: string;
    limit?: number;
}
export declare class ListLatestEventsUseCase {
    private readonly eventRepository;
    constructor(eventRepository: EventRepositoryPort);
    execute(query: ListLatestEventsQuery): Promise<Event[]>;
}
