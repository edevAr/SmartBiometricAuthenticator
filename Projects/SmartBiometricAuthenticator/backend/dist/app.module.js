"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const seed_service_1 = require("./application/seed/seed.service");
const access_attempts_service_1 = require("./interfaces/http/access/access-attempts.service");
const access_controller_1 = require("./interfaces/http/access/access.controller");
const auth_controller_1 = require("./interfaces/http/auth/auth.controller");
const auth_service_1 = require("./interfaces/http/auth/auth.service");
const jwt_auth_guard_1 = require("./interfaces/http/auth/jwt-auth.guard");
const cameras_controller_1 = require("./interfaces/http/cameras/cameras.controller");
const contacts_controller_1 = require("./interfaces/http/contacts/contacts.controller");
const events_controller_1 = require("./interfaces/http/events/events.controller");
const users_controller_1 = require("./interfaces/http/users/users.controller");
const users_service_1 = require("./interfaces/http/users/users.service");
const access_log_orm_entity_1 = require("./infrastructure/persistence/typeorm/access-log.orm-entity");
const alert_orm_entity_1 = require("./infrastructure/persistence/typeorm/alert.orm-entity");
const biometric_profile_orm_entity_1 = require("./infrastructure/persistence/typeorm/biometric-profile.orm-entity");
const camera_orm_entity_1 = require("./infrastructure/persistence/typeorm/camera.orm-entity");
const contact_orm_entity_1 = require("./infrastructure/persistence/typeorm/contact.orm-entity");
const event_orm_entity_1 = require("./infrastructure/persistence/typeorm/event.orm-entity");
const role_orm_entity_1 = require("./infrastructure/persistence/typeorm/role.orm-entity");
const security_event_orm_entity_1 = require("./infrastructure/persistence/typeorm/security-event.orm-entity");
const user_orm_entity_1 = require("./infrastructure/persistence/typeorm/user.orm-entity");
const contact_repository_adapter_1 = require("./infrastructure/persistence/typeorm/contact.repository.adapter");
const camera_motion_monitor_service_1 = require("./infrastructure/cameras/camera-motion-monitor.service");
const camera_snapshot_service_1 = require("./infrastructure/cameras/camera-snapshot.service");
const camera_repository_adapter_1 = require("./infrastructure/persistence/typeorm/camera.repository.adapter");
const event_repository_adapter_1 = require("./infrastructure/persistence/typeorm/event.repository.adapter");
const create_contact_usecase_1 = require("./application/contacts/use-cases/create-contact.usecase");
const register_camera_usecase_1 = require("./application/cameras/use-cases/register-camera.usecase");
const update_camera_usecase_1 = require("./application/cameras/use-cases/update-camera.usecase");
const list_latest_events_usecase_1 = require("./application/events/use-cases/list-latest-events.usecase");
const entities = [
    role_orm_entity_1.RoleOrmEntity,
    user_orm_entity_1.UserOrmEntity,
    biometric_profile_orm_entity_1.BiometricProfileOrmEntity,
    access_log_orm_entity_1.AccessLogOrmEntity,
    security_event_orm_entity_1.SecurityEventOrmEntity,
    alert_orm_entity_1.AlertOrmEntity,
    contact_orm_entity_1.ContactOrmEntity,
    camera_orm_entity_1.CameraOrmEntity,
    event_orm_entity_1.EventOrmEntity,
];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET', 'dev-jwt-secret-change-in-production'),
                    signOptions: { expiresIn: '7d' },
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST', 'localhost'),
                    port: Number(config.get('DB_PORT', '5432')),
                    username: config.get('DB_USER', 'postgres'),
                    password: config.get('DB_PASSWORD', 'postgres'),
                    database: config.get('DB_NAME', 'smart_biometricauthenticator'),
                    entities,
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature(entities),
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            users_controller_1.UsersController,
            access_controller_1.AccessController,
            contacts_controller_1.ContactsController,
            cameras_controller_1.CamerasController,
            events_controller_1.EventsController,
        ],
        providers: [
            app_service_1.AppService,
            seed_service_1.SeedService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            access_attempts_service_1.AccessAttemptsService,
            create_contact_usecase_1.CreateContactUseCase,
            register_camera_usecase_1.RegisterCameraUseCase,
            update_camera_usecase_1.UpdateCameraUseCase,
            camera_snapshot_service_1.CameraSnapshotService,
            camera_motion_monitor_service_1.CameraMotionMonitorService,
            list_latest_events_usecase_1.ListLatestEventsUseCase,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: 'ContactRepositoryPort',
                useClass: contact_repository_adapter_1.ContactRepositoryAdapter,
            },
            {
                provide: 'CameraRepositoryPort',
                useClass: camera_repository_adapter_1.CameraRepositoryAdapter,
            },
            {
                provide: 'EventRepositoryPort',
                useClass: event_repository_adapter_1.EventRepositoryAdapter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map