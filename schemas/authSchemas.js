import Joi from "joi";
import {emailRegexp} from "../constants/regexp.js";

export const userSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).message("Email must must be in valid format").required(),
    password: Joi.string().min(8).required(),
})

export const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
})
