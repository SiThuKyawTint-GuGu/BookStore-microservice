// dbSync.js
const Book = require('../model/Book');
const sequelize = require('./db');

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');

        //Connect Database
        await Book.sync({ force: true });

        console.log('Tables synced successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = syncDatabase;
