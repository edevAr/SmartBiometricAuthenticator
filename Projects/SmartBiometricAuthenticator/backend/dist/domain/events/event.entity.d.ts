import { EntityBase } from '../common/entity.base';
export declare enum EventType {
    KNOWN_VISITOR = "KNOWN_VISITOR",
    UNKNOWN_VISITOR = "UNKNOWN_VISITOR",
    INTRUDER_ALERT = "INTRUDER_ALERT",
    MOTION_DETECTED = "MOTION_DETECTED",
    PERSON_DETECTED = "PERSON_DETECTED"
}
export interface EventProps {
    cameraId: string;
    contactId?: string | null;
    type: EventType;
    detectedAt: Date;
    metadataJson?: string | null;
}
export declare class Event extends EntityBase<string> {
    private props;
    private constructor();
    static createNew(params: {
        id: string;
        cameraId: string;
        type: EventType;
        contactId?: string | null;
        metadataJson?: string | null;
    }): Event;
    static restore(id: string, props: EventProps): Event;
    get cameraId(): string;
    get contactId(): string | null | undefined;
    get type(): EventType;
    get detectedAt(): Date;
    get metadataJson(): string | null | undefined;
}
