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
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = exports.DEFAULT_ADMIN_USER_ID = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_2 = require("typeorm");
const role_orm_entity_1 = require("../../infrastructure/persistence/typeorm/role.orm-entity");
const user_orm_entity_1 = require("../../infrastructure/persistence/typeorm/user.orm-entity");
const SALT_ROUNDS = 10;
exports.DEFAULT_ADMIN_USER_ID = '00000000-0000-0000-0000-000000000001';
let SeedService = SeedService_1 = class SeedService {
    roles;
    users;
    config;
    logger = new common_1.Logger(SeedService_1.name);
    constructor(roles, users, config) {
        this.roles = roles;
        this.users = users;
        this.config = config;
    }
    async onModuleInit() {
        await this.seedRoles();
        await this.seedDefaultAdmin();
    }
    async seedRoles() {
        const names = [
            { name: 'ADMIN', description: 'Administrador del sistema' },
            { name: 'OPERATOR', description: 'Operador de seguridad' },
            { name: 'AUTHORIZED', description: 'Usuario autorizado / residente' },
        ];
        for (const r of names) {
            const exists = await this.roles.findOne({ where: { name: r.name } });
            if (!exists) {
                await this.roles.save(this.roles.create(r));
                this.logger.log(`Rol creado: ${r.name}`);
            }
        }
    }
    async seedDefaultAdmin() {
        const email = this.config.get('DEFAULT_ADMIN_EMAIL') ?? 'admin@securehome.local';
        const plain = this.config.get('DEFAULT_ADMIN_PASSWORD') ?? 'SmartBioAuth2025!';
        let admin = await this.users.findOne({ where: { email: email.toLowerCase() } });
        if (admin) {
            return;
        }
        const adminRole = await this.roles.findOne({ where: { name: 'ADMIN' } });
        if (!adminRole) {
            this.logger.warn('No se pudo crear admin: falta rol ADMIN');
            return;
        }
        const passwordHash = await bcrypt.hash(plain, SALT_ROUNDS);
        admin = this.users.create({
            id: exports.DEFAULT_ADMIN_USER_ID,
            email: email.toLowerCase(),
            passwordHash,
            fullName: 'Administrador',
            phone: null,
            relationship: null,
            roleId: adminRole.id,
            isActive: true,
        });
        await this.users.save(admin);
        this.logger.log(`Usuario admin sembrado: ${email}`);
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_orm_entity_1.RoleOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_orm_entity_1.UserOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], SeedService);
//# sourceMappingURL=seed.service.js.map