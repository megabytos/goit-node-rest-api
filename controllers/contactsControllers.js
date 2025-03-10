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
    const {name, email, phone} = req.body;
    console.log(name, email, phone);
    const contact = await addContact(name, email, phone);
    res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
    const {id} = req.params;
    const {name, email, phone} = req.body;
    const contact = await updateContactById(id, name, email, phone);
    if (!contact) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json(contact);
};

