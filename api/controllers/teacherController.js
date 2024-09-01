const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Coordination = require('../models/Coordination')
const asyncHandler = require('express-async-handler')

const postTeacher = asyncHandler(async (req,res) => {
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

const getTeachers = asyncHandler(async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})
const getTeacherById = asyncHandler(async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateTeacher = asyncHandler(async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteTeacher = asyncHandler(async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    postTeacher
}