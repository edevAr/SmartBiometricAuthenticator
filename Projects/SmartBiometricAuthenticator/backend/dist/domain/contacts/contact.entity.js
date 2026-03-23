"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.ContactRelationship = void 0;
const entity_base_1 = require("../common/entity.base");
var ContactRelationship;
(function (ContactRelationship) {
    ContactRelationship["FATHER"] = "FATHER";
    ContactRelationship["MOTHER"] = "MOTHER";
    ContactRelationship["FAMILY"] = "FAMILY";
    ContactRelationship["FRIEND"] = "FRIEND";
    ContactRelationship["OTHER"] = "OTHER";
})(ContactRelationship || (exports.ContactRelationship = ContactRelationship = {}));
class Contact extends entity_base_1.EntityBase {
    props;
    constructor(id, props) {
        super(id);
        this.props = props;
    }
    static createNew(params) {
        const now = new Date();
        return new Contact(params.id, {
            adminId: params.adminId,
            name: params.name,
            relationship: params.relationship,
            email: params.email ?? null,
            phone: params.phone ?? null,
            isActive: true,
            createdAt: now,
            updatedAt: now,
        });
    }
    static restore(id, props) {
        return new Contact(id, props);
    }
    get adminId() {
        return this.props.adminId;
    }
    get name() {
        return this.props.name;
    }
    get relationship() {
        return this.props.relationship;
    }
    get email() {
        return this.props.email;
    }
    get phone() {
        return this.props.phone;
    }
    get isActive() {
        return this.props.isActive;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    deactivate() {
        this.props.isActive = false;
        this.touch();
    }
    rename(name) {
        this.props.name = name;
        this.touch();
    }
    changeRelationship(relationship) {
        this.props.relationship = relationship;
        this.touch();
    }
    updateContactInfo(email, phone) {
        this.props.email = email ?? null;
        this.props.phone = phone ?? null;
        this.touch();
    }
    touch() {
        this.props.updatedAt = new Date();
    }
}
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map