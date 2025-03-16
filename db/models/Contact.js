import {DataTypes} from "sequelize";
import sequelize from "../sequelize.js";
import {phoneRegexp} from "../../constants/regexp.js";

const Contact = sequelize.define(
    "contact", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name must exist"
                },
                notEmpty: {
                    msg: "Name cannot be empty"
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
                    args: [phoneRegexp],
                    msg: "Phone must be digits in the format (XXX) XXX-XXXX"
                }

            }
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

//Contact.sync({force: true});

export default Contact;