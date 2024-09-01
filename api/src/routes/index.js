const { Router } = require('express')
const teacherRouter = require('./teacherRouter')
const router = Router()

router.use('/', teacherRouter)

module.exports = router