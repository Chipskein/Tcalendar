const { Sequelize } = require('sequelize');
const { DATABASE_URL,DATABASE_CONFIG } =require('./database');
const sequelize = new Sequelize(DATABASE_URL,DATABASE_CONFIG);
module.exports={
    db:sequelize,
}