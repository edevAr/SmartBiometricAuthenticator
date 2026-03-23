import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RoleOrmEntity } from '@infrastructure/persistence/typeorm/role.orm-entity';
import { UserOrmEntity } from '@infrastructure/persistence/typeorm/user.orm-entity';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly users;
    private readonly roles;
    private readonly jwtService;
    constructor(users: Repository<UserOrmEntity>, roles: Repository<RoleOrmEntity>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: string;
            isActive: boolean;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: string;
            isActive: boolean;
        };
    }>;
    private buildAuthResponse;
}
