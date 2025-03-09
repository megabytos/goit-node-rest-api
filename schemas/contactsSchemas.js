import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).message("Phone must be digits in the format (XXX) XXX-XXXX").required(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).message("Phone must be digits in the format (XXX) XXX-XXXX"),
}).or('name', 'email', 'phone').messages({"object.missing": `Body must have at least one field`})