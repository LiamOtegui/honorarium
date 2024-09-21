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

//////////////////////////////////////////////////////////////////////////////////

const associateTeacherToCourse = asyncHandler(async (req, res) => {
    try {
        const { teacherId, courseId } = req.body

        const teacher = await Teacher.findByPk(teacherId)
        const course = await Course.findByPk(courseId)

        if (!teacher || !course) {
            res.status(404)
            throw new Error('Teacher or Course not found')
        }

        await teacher.addCourse(course)

        res.json({ message: 'Teacher associated with Course successfully' })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteAssociation = asyncHandler(async (req, res) => {
    try {
        const { teacherId, courseId } = req.params

        if (isNaN(teacherId) || isNaN(courseId)) {
            res.status(400);
            throw new Error('Invalid teacherId or courseId');
        }

        const teacher = await Teacher.findByPk(teacherId)
        const course = await Course.findByPk(courseId)

        if (!teacher || !course) {
            res.status(404)
            throw new Error('Teacher or Course not found')
        }

        await teacher.removeCourse(course)

        res.json({ message: 'Association deleted with success!' })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getTeacherCourses = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const teacher = await Teacher.findByPk(id, {
            include: {
                model: Course,
                through: {
                    attributes: [] // Con esto me devuelve solo la lista de cursos asociados a un profesor sin los detalles de la tabla TeacherCourse
                }
            }
        })

        if (!teacher) {
            res.status(404)
            throw new Error('Teacher not found')
        }

        res.json(teacher.Courses)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getTeacherCoordinations = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const coordination = await Coordination.findAll(
            { where: { teacherId: id } }
        )
        res.json(coordination)
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
    deleteTeacher,
    associateTeacherToCourse,
    deleteAssociation,
    getTeacherCourses,
    getTeacherCoordinations
}