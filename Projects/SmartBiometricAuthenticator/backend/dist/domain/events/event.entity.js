"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.EventType = void 0;
const entity_base_1 = require("../common/entity.base");
var EventType;
(function (EventType) {
    EventType["KNOWN_VISITOR"] = "KNOWN_VISITOR";
    EventType["UNKNOWN_VISITOR"] = "UNKNOWN_VISITOR";
    EventType["INTRUDER_ALERT"] = "INTRUDER_ALERT";
    EventType["MOTION_DETECTED"] = "MOTION_DETECTED";
    EventType["PERSON_DETECTED"] = "PERSON_DETECTED";
})(EventType || (exports.EventType = EventType = {}));
class Event extends entity_base_1.EntityBase {
    props;
    constructor(id, props) {
        super(id);
        this.props = props;
    }
    static createNew(params) {
        const now = new Date();
        return new Event(params.id, {
            cameraId: params.cameraId,
            contactId: params.contactId ?? null,
            type: params.type,
            detectedAt: now,
            metadataJson: params.metadataJson ?? null,
        });
    }
    static restore(id, props) {
        return new Event(id, props);
    }
    get cameraId() {
        return this.props.cameraId;
    }
    get contactId() {
        return this.props.contactId;
    }
    get type() {
        return this.props.type;
    }
    get detectedAt() {
        return this.props.detectedAt;
    }
    get metadataJson() {
        return this.props.metadataJson;
    }
}
exports.Event = Event;
//# sourceMappingURL=event.entity.js.map