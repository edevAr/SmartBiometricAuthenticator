import { Contact, ContactRelationship } from '@domain/contacts/contact.entity';
export declare class ContactOrmEntity {
    id: string;
    adminId: string;
    name: string;
    relationship: ContactRelationship;
    email: string | null;
    phone: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    static toDomain(entity: ContactOrmEntity): Contact;
    static fromDomain(contact: Contact): ContactOrmEntity;
}
