import { EntityBase } from '../common/entity.base';
export declare enum ContactRelationship {
    FATHER = "FATHER",
    MOTHER = "MOTHER",
    FAMILY = "FAMILY",
    FRIEND = "FRIEND",
    OTHER = "OTHER"
}
export interface ContactProps {
    adminId: string;
    name: string;
    relationship: ContactRelationship;
    email?: string | null;
    phone?: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Contact extends EntityBase<string> {
    private props;
    private constructor();
    static createNew(params: {
        id: string;
        adminId: string;
        name: string;
        relationship: ContactRelationship;
        email?: string | null;
        phone?: string | null;
    }): Contact;
    static restore(id: string, props: ContactProps): Contact;
    get adminId(): string;
    get name(): string;
    get relationship(): ContactRelationship;
    get email(): string | null | undefined;
    get phone(): string | null | undefined;
    get isActive(): boolean;
    get createdAt(): Date;
    get updatedAt(): Date;
    deactivate(): void;
    rename(name: string): void;
    changeRelationship(relationship: ContactRelationship): void;
    updateContactInfo(email?: string | null, phone?: string | null): void;
    private touch;
}
