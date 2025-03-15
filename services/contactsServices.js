import Contact from "../db/models/Contact.js";
import HttpError from "../helpers/HttpError.js";

export async function listContacts({ owner, page, limit, favorite }) {
    const where = { owner };
    if (favorite !== undefined) {
        where.favorite = favorite === "true";
    }
    const _limit = Number(limit) > 0 ? Number(limit) : 20;
    const _page = Number(page) > 1 ? Number(page) : 1;
    const offset = (_page - 1) * _limit;
    return await Contact.findAll({where,  limit:_limit,  offset});
}

export async function getContact(query) {
    const contact = await Contact.findOne({where: query});
    if (!contact) {
        throw HttpError(404, "Contact not found");
    }
    return contact;
}

export async function removeContact(query) {
    const contact = await getContact(query);
    await contact.destroy();
    return contact;
}

export async function addContact(data) {
    return Contact.create(data);
}

export async function updateContactById(query, data) {
    const contact = await getContact(query);
    return contact.update(data, {returning: true});
}
