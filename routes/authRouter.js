import express from "express";
import {register, login, logout, current, subscription, avatar, verify, resend} from "../controllers/authControllers.js";
import {userSchema, updateSubscriptionSchema, emailVerificationSchema} from "../schemas/authSchemas.js"
import validateBody from "../helpers/validateBody.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import auth from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema), controllerWrapper(register));

authRouter.post("/login", validateBody(userSchema), controllerWrapper(login));

authRouter.post("/logout", auth, controllerWrapper(logout));

authRouter.get("/current", auth, controllerWrapper(current));

authRouter.patch("/subscription", auth, validateBody(updateSubscriptionSchema), controllerWrapper(subscription));

authRouter.patch("/avatars", auth, upload.single('avatar'), controllerWrapper(avatar));

authRouter.post("/verify", validateBody(emailVerificationSchema), controllerWrapper(resend));

authRouter.get("/verify/:verificationToken", controllerWrapper(verify));

export default authRouter;