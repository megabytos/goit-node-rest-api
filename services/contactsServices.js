import Contact from "../db/models/Contact.js";

export async function listContacts() {
    return await Contact.findAll();
}

export async function getContactById(contactId) {
    return await Contact.findByPk(contactId) || null;
}

export async function removeContact(contactId) {
    const contact = await getContactById(contactId);
    if (!contact)   return null;
    await contact.destroy();
    return contact;
}

export async function addContact(data) {
    return Contact.create(data);
}

export async function updateContactById(contactId, data) {
    const contact = await getContactById(contactId);
    if (!contact) return null;
    return contact.update(data, { returning: true });
}