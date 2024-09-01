const { Router } = require('express')
const router = Router()
const teacherRouter = require('./teacherRouter')
const courseRouter = require('./courseRouter')
const coordinationRouter = require('./coordinationRouter')

router.use('/teacher', teacherRouter)
router.use('/course', courseRouter)
router.use('/coordination', coordinationRouter)

module.exports = router