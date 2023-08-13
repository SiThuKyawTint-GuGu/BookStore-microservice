const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
        validate: {
            isEmailUnique: async function (value) {
                const existingCustomer = await Customer.findOne({ where: { email: value } });
                if (existingCustomer) {
                    throw new Error('Email is already in use');
                }
            }
        }
    },
    phone: {
        type: DataTypes.STRING(11),
        allowNull: true,
        unique: {
            msg: 'Phone number already exists'
        },
        validate: {
            isPhoneNumberValid(value) {
                if (!/^[0-9]{11}$/.test(value)) {
                    throw new Error('Phone number must be exactly 11 digits');
                }
            },
            async isPhoneNumberUnique(value) {
                const existingUser = await User.findOne({ where: { phone: value } });
                if (existingUser) {
                    throw new Error('Phone number is already in use');
                }
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Customer;
