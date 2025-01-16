import { StatusCodes } from 'http-status-codes'
import { machineService } from '~/services/department/machines/machineService'

const createNew = async (req, res, next) => {
  try {
    const createMachine = await machineService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createMachine)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const machineId = req.params.id

    const machine = await machineService.getDetails(machineId)
    res.status(StatusCodes.OK).json(machine)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const sort = req.query.sort || 'asc'
    const filter = req.query.filter || 'id'
    const offset = (page - 1) * limit

    const machines = await machineService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(machines)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const machineId = req.params.id
    const machine = await machineService.update(machineId, req.body)
    res.status(StatusCodes.OK).json(machine)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const machineId = req.params.id
    const result = await machineService.deleteItem(machineId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const machineController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
