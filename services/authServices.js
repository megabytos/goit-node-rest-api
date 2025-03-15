import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";

const {JWT_SECRET} = process.env;

export async function getUserById(userId) {
    return await User.findByPk(userId);
}

export async function getUserByEmail(email) {
    return await User.findOne({where: {email}});
}

export async function addUser(data) {
    const {email, password} = data;
    if (!email) {
        throw HttpError(400, `Email is empty`);
    }
    const user = await getUserByEmail(email);
    if (user) {
        throw HttpError(409, `Email in use`);
    }
    const hashedPassword = password && await bcrypt.hash(password, 10);
    return await User.create({...data, password: hashedPassword});
}

export async function loginUser(data) {
    const {email, password} = data;
    const user = await getUserByEmail(email);
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw HttpError(401, "Email or password is wrong");
    }
    const token = jwt.sign({id: user.id, email}, JWT_SECRET, {expiresIn: "24h"});
    return await user.update({token}, {returning: true});
}

export async function logoutUser(userId) {
    const user = await getUserById(userId);
    if (!user) {
        throw HttpError(401, "Not authorized");
    }
    return await user.update({token: null}, {returning: true});
}

export async function updateUser(userId, data) {
    const user = await getUserById(userId);
    return user.update(data, {returning: true});
}
