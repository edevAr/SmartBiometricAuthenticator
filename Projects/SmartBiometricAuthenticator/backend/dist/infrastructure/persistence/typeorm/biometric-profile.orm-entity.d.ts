import { UserOrmEntity } from './user.orm-entity';
export declare class BiometricProfileOrmEntity {
    id: string;
    userId: string;
    user: UserOrmEntity;
    faceTemplateRef: string | null;
    voiceTemplateRef: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
