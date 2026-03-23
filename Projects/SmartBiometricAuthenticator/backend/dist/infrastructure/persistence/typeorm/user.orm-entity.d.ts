import { RoleOrmEntity } from './role.orm-entity';
export declare class UserOrmEntity {
    id: string;
    email: string;
    passwordHash: string | null;
    fullName: string;
    phone: string | null;
    relationship: string | null;
    roleId: string;
    role: RoleOrmEntity;
    ownerUserId: string | null;
    owner: UserOrmEntity | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
