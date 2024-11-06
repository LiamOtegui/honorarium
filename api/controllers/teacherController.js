const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Coordination = require('../models/Coordination')
const TeacherCourse = require('../models/TeacherCourse')
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
        const { teacherName, courseName, assignedDay } = req.body

        const teacher = await Teacher.findOne({ where: { name: teacherName } })
        const course = await Course.findOne({ where: { name: courseName } })

        if (!teacher || !course) {
            res.status(404)
            throw new Error('Teacher or Course not found')
        }

        await TeacherCourse.create({
            teacherId: teacher.id,
            courseId: course.id,
            assignedDay: assignedDay  // 'day' o 'day2' según lo que elija en el req.body
        })

        res.json({ message: 'Teacher associated with Course successfully' })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteAssociation = asyncHandler(async (req, res) => {
    try {
        const { teacherName, courseName } = req.params

        const teacher = await Teacher.findOne({ where: { name: teacherName } })
        const course = await Course.findOne({ where: { name: courseName } })

        if (!teacher || !course) {
            res.status(404)
            throw new Error('Teacher or Course not found')
        }

        await teacher.removeCourse(course);

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

const getAssignedDay = asyncHandler(async (req, res) => {
    try {
        const { teacherName, courseName } = req.params

        const teacher = await Teacher.findOne({ where: { name: teacherName } })
        const course = await Course.findOne({ where: { name: courseName } })

        if (!teacher || !course) {
            res.status(404)
            throw new Error('Teacher or Course not found')
        }

        const teacherCourse = await TeacherCourse.findOne({
            where: {
                teacherId: teacher.id,
                courseId: course.id
            }
        })

        if (!teacherCourse) {
            res.status(404)
            throw new Error('Association not found')
        }

        res.json({ assignedDay: teacherCourse.assignedDay })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getTeacherCoordinations = asyncHandler(async (req, res) => {
    try {
        const { name } = req.params

        const teacher = await Teacher.findOne(
            { where: { name } }
        )

        if (!teacher) {
            res.status(404)
            throw new Error('Teacher not found')
        }

        const coordination = await Coordination.findAll(
            { where: { teacherName: name } }
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
    getAssignedDay,
    getTeacherCoordinations
}