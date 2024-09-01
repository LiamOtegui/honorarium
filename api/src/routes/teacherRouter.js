const { Router } = require('express')
const { postTeacher } = require('../../controllers/teacherController')
const teacherRouter = Router()

teacherRouter.post('/', postTeacher)

module.exports = teacherRouter