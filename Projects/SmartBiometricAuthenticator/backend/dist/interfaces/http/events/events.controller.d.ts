import { ListLatestEventsUseCase } from '@application/events/use-cases/list-latest-events.usecase';
export declare class EventsController {
    private readonly listLatestEventsUseCase;
    constructor(listLatestEventsUseCase: ListLatestEventsUseCase);
    list(limit?: string): Promise<{
        id: string;
        cameraId: string;
        contactId: string | null | undefined;
        type: import("../../../domain/events/event.entity").EventType;
        detectedAt: Date;
        metadataJson: string | null | undefined;
    }[]>;
}
