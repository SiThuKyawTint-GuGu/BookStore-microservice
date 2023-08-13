const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
    publication_year: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
    }
}, {
    timestamps: true,
});

module.exports = Book;
