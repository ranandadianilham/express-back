const Sequelize = require("sequelize");
require('dotenv').config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        schema: process.env.DB_SCHEMA
    }
);



module.exports = sequelize;