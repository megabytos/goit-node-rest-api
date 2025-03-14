import {DataTypes} from "sequelize";
import sequelize from "../sequelize.js";

const Contact = sequelize.define(
    "contact", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: "name must contain only letters"
                },
                notNull: {
                    msg: "name must exist"
                },
                notEmpty: {
                    msg: "name cannot be empty"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: [/^\(\d{3}\) \d{3}-\d{4}$/],
                    msg: "Phone must be digits in the format (XXX) XXX-XXXX"
                }

            }
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

//Contact.sync({alter: true});

export default Contact;