const { Router } = require('express')
const { postTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher, getTeacherCourses, associateTeacherToCourse, getTeacherCoordinations } = require('../../controllers/teacherController')
const teacherRouter = Router()

teacherRouter.post('/', postTeacher)
teacherRouter.get('/', getTeachers)
teacherRouter.get('/:id', getTeacherById)
teacherRouter.put('/:id', updateTeacher)
teacherRouter.delete('/:id', deleteTeacher)

teacherRouter.post('/associate-course', associateTeacherToCourse)
teacherRouter.get('/:id/courses', getTeacherCourses)

teacherRouter.get('/:id/coordinations', getTeacherCoordinations)

module.exports = teacherRouter