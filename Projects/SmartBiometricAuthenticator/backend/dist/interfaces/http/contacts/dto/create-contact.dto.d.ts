import { ContactRelationship } from '@domain/contacts/contact.entity';
export declare class CreateContactDto {
    name: string;
    relationship: ContactRelationship;
    email?: string;
    phone?: string;
}
