import express from "express";
import {register, login, logout, current, subscription} from "../controllers/authControllers.js";
import {userSchema, updateSubscriptionSchema} from "../schemas/authSchemas.js"
import validateBody from "../helpers/validateBody.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import auth from "../middlewares/authenticate.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema), controllerWrapper(register));

authRouter.post("/login", validateBody(userSchema), controllerWrapper(login));

authRouter.post("/logout", auth, controllerWrapper(logout));

authRouter.get("/current", auth, controllerWrapper(current));

authRouter.patch("/subscription", auth, validateBody(updateSubscriptionSchema), controllerWrapper(subscription));

export default authRouter;