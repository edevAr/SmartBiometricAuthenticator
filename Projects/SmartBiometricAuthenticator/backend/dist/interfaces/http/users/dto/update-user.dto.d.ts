import { ContactRelationship } from '@domain/contacts/contact.entity';
export declare class UpdateUserDto {
    email?: string;
    fullName?: string;
    password?: string;
    phone?: string;
    relationship?: ContactRelationship;
    isActive?: boolean;
    roleName?: string;
}
