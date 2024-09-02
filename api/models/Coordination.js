const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const Coordination = sequelize.define(
    'Coordination',
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
        days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hourlyPay: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hours: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = Coordination;