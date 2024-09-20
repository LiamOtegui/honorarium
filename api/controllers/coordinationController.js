const Coordination = require('../models/Coordination')
const asyncHandler = require('express-async-handler')

const postCoordination = asyncHandler(async (req, res) => {
    try {
        const { name, days, hourlyPay, hours, teacherId } = req.body

        const coordination = await Coordination.create({
            name,
            days,
            hourlyPay,
            hours,
            teacherId
        })

        res.json(coordination)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getCoordinations = asyncHandler(async (req, res) => {
    try {
        const coordinations = await Coordination.findAll()

        res.json(coordinations)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})
const getCoordinationById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const coordination = await Coordination.findByPk(id)

        res.json(coordination)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateCoordination = asyncHandler(async (req, res) => {
    try {
        const { name, days, hourlyPay, hours, teacherId } = req.body
        const { id } = req.params

        const coordination = await Coordination.update(
            { name, days, hourlyPay, hours, teacherId },
            { where: { id: id } }
        )

        const update = await Coordination.findByPk(id)

        res.json(update)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteCoordination = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const coordination = await Coordination.findByPk(id)

        const destroy = await Coordination.destroy(
            { where: { id: id } }
        )

        res.json(coordination)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    postCoordination,
    getCoordinations,
    getCoordinationById,
    updateCoordination,
    deleteCoordination
}