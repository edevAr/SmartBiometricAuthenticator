import { ContactRelationship } from '@domain/contacts/contact.entity';
export declare class CreateUserDto {
    email: string;
    fullName: string;
    password?: string;
    phone?: string;
    relationship?: ContactRelationship;
    roleName?: string;
}
