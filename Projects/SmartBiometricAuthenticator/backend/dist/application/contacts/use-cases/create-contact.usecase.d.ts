import { Contact, ContactRelationship } from '@domain/contacts/contact.entity';
import type { ContactRepositoryPort } from '@application/contacts/ports/contact.repository';
export interface CreateContactCommand {
    adminId: string;
    name: string;
    relationship: ContactRelationship;
    email?: string | null;
    phone?: string | null;
}
export declare class CreateContactUseCase {
    private readonly contactRepository;
    constructor(contactRepository: ContactRepositoryPort);
    execute(command: CreateContactCommand): Promise<Contact>;
}
