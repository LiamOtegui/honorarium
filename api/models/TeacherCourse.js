const { DataTypes } = require('sequelize')
const Teacher = require('./Teacher')
const Course = require('./Course')
const sequelize = require('../database/db')

// tabla intermedia que sirve para que mas de un teacher pueda tener un mismo curso (ej: Juan y Claudia dan el curso de Teens 2 C).

const TeacherCourse = sequelize.define(
    'TeacherCourse',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Teacher,
                key: 'id'
            }
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Course,
                key: 'id'
            }
        },
        assignedDay: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = TeacherCourse