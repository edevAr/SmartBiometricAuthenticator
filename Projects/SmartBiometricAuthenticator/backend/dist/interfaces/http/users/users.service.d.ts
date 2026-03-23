import { Repository } from 'typeorm';
import { BiometricProfileOrmEntity } from '@infrastructure/persistence/typeorm/biometric-profile.orm-entity';
import { RoleOrmEntity } from '@infrastructure/persistence/typeorm/role.orm-entity';
import { UserOrmEntity } from '@infrastructure/persistence/typeorm/user.orm-entity';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { UpsertBiometricProfileDto } from './dto/upsert-biometric.dto';
export declare class UsersService {
    private readonly users;
    private readonly roles;
    private readonly biometrics;
    constructor(users: Repository<UserOrmEntity>, roles: Repository<RoleOrmEntity>, biometrics: Repository<BiometricProfileOrmEntity>);
    toPublic(user: UserOrmEntity): {
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        relationship: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    findContactsForAccount(sessionUserId: string, sessionRole: string, activeOnly?: boolean): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        relationship: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string, sessionUserId: string, sessionRole: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        relationship: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreateUserDto, sessionUserId: string, sessionRole: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        relationship: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, sessionUserId: string, sessionRole: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        relationship: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deactivate(id: string, sessionUserId: string, sessionRole: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        relationship: string | null;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private assertOwnsAuthorizedContact;
    upsertBiometric(userId: string, dto: UpsertBiometricProfileDto, sessionUserId: string, sessionRole: string): Promise<{
        id: string;
        userId: string;
        faceTemplateRef: string | null;
        voiceTemplateRef: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getBiometric(userId: string, sessionUserId: string, sessionRole: string): Promise<{
        id: string;
        userId: string;
        faceTemplateRef: string | null;
        voiceTemplateRef: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
