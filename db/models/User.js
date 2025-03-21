import {DataTypes} from "sequelize";
import sequelize from "../sequelize.js";
import {emailRegexp} from "../../constants/regexp.js";

const User = sequelize.define(
    "user", {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Password must exist"
                },
                notEmpty: {
                    msg: "Password cannot be empty"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { msg: "Email is already in use" },
            validate: {
                is: emailRegexp,
            },
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter"
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        verify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

//User.sync({alter: true });

export default User;


