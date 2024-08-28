const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const Course = sequelize.define(
    'Course',
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
        students: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pricePerHour: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = Course