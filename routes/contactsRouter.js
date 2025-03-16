import express from "express";
import {getAllContacts, getOneContact, deleteContact, createContact, updateContact} from "../controllers/contactsControllers.js";
import {createContactSchema, updateContactSchema, updateStatusContactSchema} from "../schemas/contactsSchemas.js"
import validateBody from "../helpers/validateBody.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import auth from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(auth);

contactsRouter.get("/", controllerWrapper(getAllContacts));

contactsRouter.get("/:id", controllerWrapper(getOneContact));

contactsRouter.delete("/:id", controllerWrapper(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), controllerWrapper(createContact));

contactsRouter.put("/:id", validateBody(updateContactSchema), controllerWrapper(updateContact));

contactsRouter.patch("/:id/favorite", validateBody(updateStatusContactSchema), controllerWrapper(updateContact));

export default contactsRouter;
