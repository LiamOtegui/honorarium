const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Coordination = require('../models/Coordination')
const asyncHandler = require('express-async-handler')

const postTeacher = asyncHandler(async (req, res) => {
    try {
        const { name, title } = req.body

        const teacher = await Teacher.create({
            name,
            title
        })

        res.json(teacher)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getTeachers = asyncHandler(async (req, res) => {
    try {
        const teachers = await Teacher.findAll()

        res.json(teachers)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})
const getTeacherById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const teacher = await Teacher.findByPk(id)

        res.json(teacher)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateTeacher = asyncHandler(async (req, res) => {
    try {
        const { name, title } = req.body
        const { id } = req.params

        const teacher = await Teacher.update(
            { name, title },
            { where: { id: id } }
        )

        const update = await Teacher.findByPk(id)

        res.json(update)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteTeacher = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const teacher = await Teacher.findByPk(id)

        const destroy = await Teacher.destroy(
            { where: { id: id } }
        )

        res.json(teacher)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    postTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}