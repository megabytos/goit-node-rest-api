import {listContacts, getContact, removeContact, addContact, updateContactById} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const {id: owner} = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    res.status(200).json(await listContacts({owner, page, limit, favorite}));
};

export const getOneContact = async (req, res) => {
    const {id: owner} = req.user;
    const {id} = req.params;
    const contact = await getContact({id, owner});
    res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
    const {id: owner} = req.user;
    const {id} = req.params;
    const contact = await removeContact({id, owner});
    res.status(204).json(contact);
};

export const createContact = async (req, res) => {
    const {id: owner} = req.user;
    const contact = await addContact({...req.body, owner});
    res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
    const {id: owner} = req.user;
    const {id} = req.params;
    const contact = await updateContactById({id, owner}, req.body);
    res.status(200).json(contact);
};
