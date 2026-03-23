import { Repository } from 'typeorm';
import { Contact } from '@domain/contacts/contact.entity';
import { ContactRepositoryPort } from '@application/contacts/ports/contact.repository';
import { ContactOrmEntity } from './contact.orm-entity';
export declare class ContactRepositoryAdapter implements ContactRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<ContactOrmEntity>);
    findById(id: string): Promise<Contact | null>;
    findByAdmin(adminId: string): Promise<Contact[]>;
    save(contact: Contact): Promise<void>;
    remove(contact: Contact): Promise<void>;
}
