const { Router } = require('express')
const { postTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../../controllers/teacherController')
const teacherRouter = Router()

teacherRouter.post('/', postTeacher)
teacherRouter.get('/', getTeachers)
teacherRouter.get('/:id', getTeacherById)
teacherRouter.put('/:id', updateTeacher)
teacherRouter.delete('/:id', deleteTeacher)

module.exports = teacherRouter