import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).message("Phone must be digits in the format (XXX) XXX-XXXX").required(),
    favorite: Joi.boolean().default(false)
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).message("Phone must be digits in the format (XXX) XXX-XXXX"),
    favorite: Joi.boolean()
}).or('name', 'email', 'phone').messages({"object.missing": `Body must have at least one field`})

export const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
})