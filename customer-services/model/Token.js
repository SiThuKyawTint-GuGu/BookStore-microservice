const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const Customer = require('./Customer');

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Token.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = Token;
