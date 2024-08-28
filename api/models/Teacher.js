const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const Teacher = sequelize.define(
    'Teacher',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
)

module.exports = Teacher