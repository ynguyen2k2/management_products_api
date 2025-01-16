import { StatusCodes } from 'http-status-codes'
import { operationService } from '~/services/department/operations/operationService'

const createNew = async (req, res, next) => {
  try {
    const createOperation = await operationService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createOperation)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const operationId = req.params.id

    const operation = await operationService.getDetails(operationId)
    res.status(StatusCodes.OK).json(operation)
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

    const operations = await operationService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(operations)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const operationId = req.params.id
    const operation = await operationService.update(operationId, req.body)
    res.status(StatusCodes.OK).json(operation)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const operationId = req.params.id
    const result = await operationService.deleteItem(operationId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const operationController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
