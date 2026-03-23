"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("../../../domain/contacts/contact.entity");
const biometric_profile_orm_entity_1 = require("../../../infrastructure/persistence/typeorm/biometric-profile.orm-entity");
const role_orm_entity_1 = require("../../../infrastructure/persistence/typeorm/role.orm-entity");
const user_orm_entity_1 = require("../../../infrastructure/persistence/typeorm/user.orm-entity");
const SALT_ROUNDS = 10;
function canManageContacts(role) {
    return role === 'ADMIN' || role === 'OPERATOR';
}
let UsersService = class UsersService {
    users;
    roles;
    biometrics;
    constructor(users, roles, biometrics) {
        this.users = users;
        this.roles = roles;
        this.biometrics = biometrics;
    }
    toPublic(user) {
        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            relationship: user.relationship,
            role: user.role.name,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async findContactsForAccount(sessionUserId, sessionRole, activeOnly = false) {
        if (!canManageContacts(sessionRole)) {
            return [];
        }
        const qb = this.users
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.role', 'role')
            .where('role.name = :r', { r: 'AUTHORIZED' })
            .andWhere('u.owner_user_id = :owner', { owner: sessionUserId })
            .orderBy('u.created_at', 'DESC');
        if (activeOnly) {
            qb.andWhere('u.is_active = :a', { a: true });
        }
        const list = await qb.getMany();
        return list.map((u) => this.toPublic(u));
    }
    async findOne(id, sessionUserId, sessionRole) {
        const user = await this.users.findOne({ where: { id }, relations: ['role'] });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        if (user.id === sessionUserId) {
            return this.toPublic(user);
        }
        if (canManageContacts(sessionRole) &&
            user.role.name === 'AUTHORIZED' &&
            user.ownerUserId === sessionUserId) {
            return this.toPublic(user);
        }
        throw new common_1.NotFoundException('Usuario no encontrado');
    }
    async create(dto, sessionUserId, sessionRole) {
        if (!canManageContacts(sessionRole)) {
            throw new common_1.ForbiddenException('Sin permiso para registrar contactos');
        }
        const email = dto.email.toLowerCase();
        const dup = await this.users.findOne({ where: { email } });
        if (dup)
            throw new common_1.ConflictException('El email ya existe');
        const roleName = dto.roleName ?? 'AUTHORIZED';
        if (roleName !== 'AUTHORIZED' && sessionRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Solo el administrador puede asignar ese rol');
        }
        const role = await this.roles.findOne({ where: { name: roleName } });
        if (!role)
            throw new common_1.ConflictException(`Rol inválido: ${roleName}`);
        const passwordHash = dto.password
            ? await bcrypt.hash(dto.password, SALT_ROUNDS)
            : null;
        const user = this.users.create({
            email,
            passwordHash,
            fullName: dto.fullName,
            phone: dto.phone ?? null,
            relationship: dto.relationship ?? contact_entity_1.ContactRelationship.OTHER,
            roleId: role.id,
            isActive: true,
            ownerUserId: roleName === 'AUTHORIZED' ? sessionUserId : null,
        });
        await this.users.save(user);
        const withRole = await this.users.findOne({ where: { id: user.id }, relations: ['role'] });
        return this.toPublic(withRole);
    }
    async update(id, dto, sessionUserId, sessionRole) {
        const user = await this.users.findOne({ where: { id }, relations: ['role'] });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        const isSelf = user.id === sessionUserId;
        const isOwnedContact = canManageContacts(sessionRole) &&
            user.role.name === 'AUTHORIZED' &&
            user.ownerUserId === sessionUserId;
        if (!isSelf && !isOwnedContact) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (isSelf && dto.isActive === false && !canManageContacts(sessionRole)) {
            throw new common_1.ForbiddenException('No puedes desactivar tu propia cuenta desde aquí');
        }
        if (dto.email && dto.email.toLowerCase() !== user.email) {
            const dup = await this.users.findOne({ where: { email: dto.email.toLowerCase() } });
            if (dup)
                throw new common_1.ConflictException('El email ya existe');
            user.email = dto.email.toLowerCase();
        }
        if (dto.fullName !== undefined)
            user.fullName = dto.fullName;
        if (dto.phone !== undefined)
            user.phone = dto.phone;
        if (dto.relationship !== undefined)
            user.relationship = dto.relationship;
        if (dto.isActive !== undefined)
            user.isActive = dto.isActive;
        if (dto.password) {
            user.passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
        }
        if (dto.roleName) {
            if (sessionRole !== 'ADMIN') {
                throw new common_1.ForbiddenException('Solo el administrador puede cambiar el rol');
            }
            const role = await this.roles.findOne({ where: { name: dto.roleName } });
            if (!role)
                throw new common_1.ConflictException(`Rol inválido: ${dto.roleName}`);
            user.roleId = role.id;
        }
        await this.users.save(user);
        const fresh = await this.users.findOne({ where: { id }, relations: ['role'] });
        return this.toPublic(fresh);
    }
    async deactivate(id, sessionUserId, sessionRole) {
        return this.update(id, { isActive: false }, sessionUserId, sessionRole);
    }
    async assertOwnsAuthorizedContact(userId, sessionUserId) {
        const user = await this.users.findOne({ where: { id: userId }, relations: ['role'] });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        if (user.role.name !== 'AUTHORIZED' || user.ownerUserId !== sessionUserId) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return user;
    }
    async upsertBiometric(userId, dto, sessionUserId, sessionRole) {
        if (!canManageContacts(sessionRole)) {
            throw new common_1.ForbiddenException('Sin permiso');
        }
        await this.assertOwnsAuthorizedContact(userId, sessionUserId);
        let profile = await this.biometrics.findOne({ where: { userId } });
        if (!profile) {
            profile = this.biometrics.create({
                userId,
                faceTemplateRef: dto.faceTemplateRef ?? null,
                voiceTemplateRef: dto.voiceTemplateRef ?? null,
                status: dto.status ?? 'PENDING',
            });
        }
        else {
            if (dto.faceTemplateRef !== undefined)
                profile.faceTemplateRef = dto.faceTemplateRef;
            if (dto.voiceTemplateRef !== undefined)
                profile.voiceTemplateRef = dto.voiceTemplateRef;
            if (dto.status !== undefined)
                profile.status = dto.status;
        }
        await this.biometrics.save(profile);
        return {
            id: profile.id,
            userId: profile.userId,
            faceTemplateRef: profile.faceTemplateRef,
            voiceTemplateRef: profile.voiceTemplateRef,
            status: profile.status,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
        };
    }
    async getBiometric(userId, sessionUserId, sessionRole) {
        if (userId === sessionUserId) {
            const user = await this.users.findOne({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException('Usuario no encontrado');
        }
        else if (canManageContacts(sessionRole)) {
            await this.assertOwnsAuthorizedContact(userId, sessionUserId);
        }
        else {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const profile = await this.biometrics.findOne({ where: { userId } });
        if (!profile)
            return null;
        return {
            id: profile.id,
            userId: profile.userId,
            faceTemplateRef: profile.faceTemplateRef,
            voiceTemplateRef: profile.voiceTemplateRef,
            status: profile.status,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_orm_entity_1.UserOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(role_orm_entity_1.RoleOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(biometric_profile_orm_entity_1.BiometricProfileOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map