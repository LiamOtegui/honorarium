const { Router } = require('express')
const { postCoordination, getCoordinations, getCoordinationById, updateCoordination, deleteCoordination } = require('../../controllers/coordinationController')
const coordinationRouter = Router()

coordinationRouter.post('/', postCoordination)
coordinationRouter.get('/', getCoordinations)
coordinationRouter.get('/:id', getCoordinationById)
coordinationRouter.put('/:id', updateCoordination)
coordinationRouter.delete('/:id', deleteCoordination)

module.exports = coordinationRouter