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
exports.AccessController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../common/public.decorator");
const access_attempts_service_1 = require("./access-attempts.service");
const create_access_attempt_dto_1 = require("./dto/create-access-attempt.dto");
const update_alert_dto_1 = require("./dto/update-alert.dto");
let AccessController = class AccessController {
    accessService;
    constructor(accessService) {
        this.accessService = accessService;
    }
    recordAttempt(dto) {
        return this.accessService.recordAttempt(dto);
    }
    listLogs(limit) {
        return this.accessService.listAccessLogs(limit ? Number(limit) : 100);
    }
    listSecurityEvents(limit) {
        return this.accessService.listSecurityEvents(limit ? Number(limit) : 100);
    }
    listAlerts(limit) {
        return this.accessService.listAlerts(limit ? Number(limit) : 100);
    }
    updateAlert(id, dto) {
        return this.accessService.updateAlert(id, dto.status, dto.message);
    }
};
exports.AccessController = AccessController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('access/attempts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_access_attempt_dto_1.CreateAccessAttemptDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "recordAttempt", null);
__decorate([
    (0, common_1.Get)('access-logs'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "listLogs", null);
__decorate([
    (0, common_1.Get)('security-events'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "listSecurityEvents", null);
__decorate([
    (0, common_1.Get)('alerts'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "listAlerts", null);
__decorate([
    (0, common_1.Patch)('alerts/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alert_dto_1.UpdateAlertDto]),
    __metadata("design:returntype", void 0)
], AccessController.prototype, "updateAlert", null);
exports.AccessController = AccessController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [access_attempts_service_1.AccessAttemptsService])
], AccessController);
//# sourceMappingURL=access.controller.js.map