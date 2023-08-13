// dbSync.js
const sequelize = require('./db');
const Customer = require('../model/Customer');
const Token = require('../model/Token');

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');

        //Connect Database
        await Customer.sync({ alter: true });
        await Token.sync({ alter: true });

        console.log('Tables synced successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = syncDatabase;
