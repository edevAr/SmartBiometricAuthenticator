"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const list_latest_events_usecase_1 = require("../../../application/events/use-cases/list-latest-events.usecase");
const public_decorator_1 = require("../common/public.decorator");
const HARDCODED_ADMIN_ID = '00000000-0000-0000-0000-000000000001';
let EventsController = class EventsController {
    listLatestEventsUseCase;
    constructor(listLatestEventsUseCase) {
        this.listLatestEventsUseCase = listLatestEventsUseCase;
    }
    async list(limit) {
        const events = await this.listLatestEventsUseCase.execute({
            adminId: HARDCODED_ADMIN_ID,
            limit: limit ? Number(limit) : undefined,
        });
        return events.map((event) => ({
            id: event.id,
            cameraId: event.cameraId,
            contactId: event.contactId,
            type: event.type,
            detectedAt: event.detectedAt,
            metadataJson: event.metadataJson,
        }));
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "list", null);
exports.EventsController = EventsController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [list_latest_events_usecase_1.ListLatestEventsUseCase])
], EventsController);
//# sourceMappingURL=events.controller.js.map