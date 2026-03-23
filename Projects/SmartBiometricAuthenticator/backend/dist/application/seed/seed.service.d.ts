import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { RoleOrmEntity } from '@infrastructure/persistence/typeorm/role.orm-entity';
import { UserOrmEntity } from '@infrastructure/persistence/typeorm/user.orm-entity';
export declare const DEFAULT_ADMIN_USER_ID = "00000000-0000-0000-0000-000000000001";
export declare class SeedService implements OnModuleInit {
    private readonly roles;
    private readonly users;
    private readonly config;
    private readonly logger;
    constructor(roles: Repository<RoleOrmEntity>, users: Repository<UserOrmEntity>, config: ConfigService);
    onModuleInit(): Promise<void>;
    private seedRoles;
    private seedDefaultAdmin;
}
