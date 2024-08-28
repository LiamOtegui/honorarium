const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('honorarium', 'postgres', 'ferrari12', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize  