const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const Course = require('./Course')
const Coordination = require('./Coordination')
const TeacherCourse = require('./TeacherCourse')

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

Teacher.belongsToMany(Course, { through: TeacherCourse, foreignKey: 'teacherId' })
Course.belongsToMany(Teacher, { through: TeacherCourse, foreignKey: 'courseId' })

Teacher.hasMany(Coordination, {
    foreignKey: 'teacherId',
    sourceKey: 'id'
})
Coordination.belongsTo(Teacher, {
    foreignKey: 'teacherId',
    targetKey: 'id'
})

module.exports = Teacher