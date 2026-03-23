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
exports.CreateContactUseCase = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const contact_entity_1 = require("../../../domain/contacts/contact.entity");
let CreateContactUseCase = class CreateContactUseCase {
    contactRepository;
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async execute(command) {
        const contact = contact_entity_1.Contact.createNew({
            id: (0, crypto_1.randomUUID)(),
            adminId: command.adminId,
            name: command.name,
            relationship: command.relationship,
            email: command.email,
            phone: command.phone,
        });
        await this.contactRepository.save(contact);
        return contact;
    }
};
exports.CreateContactUseCase = CreateContactUseCase;
exports.CreateContactUseCase = CreateContactUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ContactRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], CreateContactUseCase);
//# sourceMappingURL=create-contact.usecase.js.map