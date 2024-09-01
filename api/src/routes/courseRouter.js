const { Router } = require('express')
const { postCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../../controllers/courseController')
const courseRouter = Router()

courseRouter.post('/', postCourse)
courseRouter.get('/', getCourses)
courseRouter.get('/:id', getCourseById)
courseRouter.put('/:id', updateCourse)
courseRouter.delete('/:id', deleteCourse)

module.exports = courseRouter