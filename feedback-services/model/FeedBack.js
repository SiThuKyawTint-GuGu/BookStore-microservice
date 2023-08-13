const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const FeedBack = sequelize.define('FeedBack', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
    feedback_text: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    feedback_date: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
    },
}, {
    timestamps: true,
});

module.exports = FeedBack;
