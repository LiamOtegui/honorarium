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
        days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pricePerHour: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hours: {
            type: DataTypes.FLOAT,
            allowNull: false
        },        
        totalPay: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = Coordination;