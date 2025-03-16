import {addUser, loginUser, logoutUser, updateAvatar, updateUser} from "../services/authServices.js";

export const register = async (req, res) => {
    const {email, subscription} = await addUser(req.body);
    res.status(201).json({user: {email, subscription}});
}

export const login = async (req, res) => {
    const {email, subscription, token} = await loginUser(req.body);
    res.status(200).json({
        token: token,
        user: {email, subscription},
    })
}

export const logout = async (req, res) => {
    await logoutUser(req.user.id);
    res.status(204).send();
}

export const current = async (req, res) => {
    const {email, subscription} = req.user;
    res.status(200).json({email, subscription});
}

export const subscription = async (req, res) => {
    const {id} = req.user;
    const {email, subscription} = await updateUser(id, req.body);
    res.status(200).json({email, subscription});
}

export const avatar = async (req, res) => {
    const {id} = req.user;
    const {avatarURL} = await updateAvatar(id, req.file);
    res.status(200).json({avatarURL});
}
