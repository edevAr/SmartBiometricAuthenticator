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
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const create_contact_usecase_1 = require("../../../application/contacts/use-cases/create-contact.usecase");
const contact_entity_1 = require("../../../domain/contacts/contact.entity");
const public_decorator_1 = require("../common/public.decorator");
const create_contact_dto_1 = require("./dto/create-contact.dto");
const HARDCODED_ADMIN_ID = '00000000-0000-0000-0000-000000000001';
let ContactsController = class ContactsController {
    createContactUseCase;
    contactRepository;
    constructor(createContactUseCase, contactRepository) {
        this.createContactUseCase = createContactUseCase;
        this.contactRepository = contactRepository;
    }
    async create(dto) {
        const contact = await this.createContactUseCase.execute({
            adminId: HARDCODED_ADMIN_ID,
            name: dto.name,
            relationship: dto.relationship ?? contact_entity_1.ContactRelationship.OTHER,
            email: dto.email,
            phone: dto.phone,
        });
        return {
            id: contact.id,
            name: contact.name,
            relationship: contact.relationship,
            email: contact.email,
            phone: contact.phone,
            isActive: contact.isActive,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        };
    }
    async findAll() {
        const contacts = await this.contactRepository.findByAdmin(HARDCODED_ADMIN_ID);
        return contacts.map((contact) => ({
            id: contact.id,
            name: contact.name,
            relationship: contact.relationship,
            email: contact.email,
            phone: contact.phone,
            isActive: contact.isActive,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        }));
    }
    async findOne(id) {
        const contact = await this.contactRepository.findById(id);
        if (!contact) {
            return null;
        }
        return {
            id: contact.id,
            name: contact.name,
            relationship: contact.relationship,
            email: contact.email,
            phone: contact.phone,
            isActive: contact.isActive,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        };
    }
};
exports.ContactsController = ContactsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findOne", null);
exports.ContactsController = ContactsController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('contacts'),
    __param(1, (0, common_1.Inject)('ContactRepositoryPort')),
    __metadata("design:paramtypes", [create_contact_usecase_1.CreateContactUseCase, Object])
], ContactsController);
//# sourceMappingURL=contacts.controller.js.map