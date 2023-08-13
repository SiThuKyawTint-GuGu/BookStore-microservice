const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const SaleBook = sequelize.define('SaleBook', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sale_date: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
    customer_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    book_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
}, {
    timestamps: true,
});

module.exports = SaleBook;
