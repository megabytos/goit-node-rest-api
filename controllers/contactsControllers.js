import {listContacts, getContactById, removeContact, addContact, updateContactById} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
    res.status(200).json(await listContacts());
};

export const getOneContact = async (req, res) => {
    const {id} = req.params;
    const contact = await getContactById(id);
    if (!contact) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
    const {id} = req.params;
    const contact = await removeContact(id);
    if (!contact) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.status(204).json(contact);
};

export const createContact = async (req, res) => {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
    const {id} = req.params;
    const contact = await updateContactById(id, req.body);
    if (!contact) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json(contact);
};

export const updateStatusContact = async (req, res) => {
    const {id} = req.params;
    const contact = await updateContactById(id, req.body);
    if (!contact) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json(contact);
};

