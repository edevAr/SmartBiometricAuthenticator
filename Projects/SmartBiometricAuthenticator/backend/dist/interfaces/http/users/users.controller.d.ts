import type { AuthenticatedRequest } from '../common/authenticated-request';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpsertBiometricProfileDto } from './dto/upsert-biometric.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(req: AuthenticatedRequest, activeOnly?: string): Promise<{
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
    findOne(req: AuthenticatedRequest, id: string): Promise<{
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
    create(req: AuthenticatedRequest, dto: CreateUserDto): Promise<{
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
    update(req: AuthenticatedRequest, id: string, dto: UpdateUserDto): Promise<{
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
    deactivate(req: AuthenticatedRequest, id: string): Promise<{
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
    getBiometric(req: AuthenticatedRequest, id: string): Promise<{
        id: string;
        userId: string;
        faceTemplateRef: string | null;
        voiceTemplateRef: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    upsertBiometric(req: AuthenticatedRequest, id: string, dto: UpsertBiometricProfileDto): Promise<{
        id: string;
        userId: string;
        faceTemplateRef: string | null;
        voiceTemplateRef: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
