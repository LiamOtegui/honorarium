const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const Course = require('./Course')
const Coordination = require('./Coordination')

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
    },
    {
        timestamps: true
    }
)

Teacher.hasMany(Course, {
    foreignKey: 'teacherId',
    sourceKey: 'id'
})
Course.belongsTo(Teacher, {
    foreignKey: 'teacherId',
    targetId: 'id'
})
Teacher.hasMany(Coordination, {
    foreignKey: 'teacherId',
    sourceKey: 'id'
})
Coordination.belongsTo(Teacher, {
    foreignKey: 'teacherId',
    targetId: 'id'
})

module.exports = Teacher