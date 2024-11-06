const Course = require('../models/Course')
const asyncHandler = require('express-async-handler')

const postCourse = asyncHandler(async (req, res) => {
    try {
        const { name, day, day2, days, students, payment } = req.body

        const course = await Course.create({
            name,
            day,
            day2,
            days,
            students,
            payment
        })

        res.json(course)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getCourses = asyncHandler(async (req, res) => {
    try {
        const courses = await Course.findAll()

        res.json(courses)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})
const getCourseById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const course = await Course.findByPk(id)

        res.json(course)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateCourse = asyncHandler(async (req, res) => {
    try {
        const { name, day, day2, days, students, payment } = req.body
        const { id } = req.params

        const course = await Course.update(
            { name, day, day2, days, students, payment },
            { where: { id: id } }
        )

        const update = await Course.findByPk(id)

        res.json(update)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteCourse = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const course = await Course.findByPk(id)

        const destroy = await Course.destroy(
            { where: { id: id } }
        )

        res.json(course)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    postCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
}