import { CreateContactUseCase } from '@application/contacts/use-cases/create-contact.usecase';
import { ContactRelationship } from '@domain/contacts/contact.entity';
import type { ContactRepositoryPort } from '@application/contacts/ports/contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactsController {
    private readonly createContactUseCase;
    private readonly contactRepository;
    constructor(createContactUseCase: CreateContactUseCase, contactRepository: ContactRepositoryPort);
    create(dto: CreateContactDto): Promise<{
        id: string;
        name: string;
        relationship: ContactRelationship;
        email: string | null | undefined;
        phone: string | null | undefined;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        relationship: ContactRelationship;
        email: string | null | undefined;
        phone: string | null | undefined;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        relationship: ContactRelationship;
        email: string | null | undefined;
        phone: string | null | undefined;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
