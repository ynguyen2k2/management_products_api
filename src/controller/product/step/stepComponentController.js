import { StatusCodes } from 'http-status-codes'
import { stepComponentService } from '~/services/product/step/stepComponentService'

const createNew = async (req, res, next) => {
  try {
    const createStepComponent = await stepComponentService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createStepComponent)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const stepComponentId = req.params.id

    const stepComponent = await stepComponentService.getDetails(stepComponentId)
    res.status(StatusCodes.OK).json(stepComponent)
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
    const sku = parseInt(req.query.sku) || 0
    const component = parseInt(req.query.component) || 0

    const stepComponents = await stepComponentService.getAll({
      sku,
      component,
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(stepComponents)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const stepComponentId = req.params.id
    const stepComponent = await stepComponentService.update(
      stepComponentId,
      req.body
    )
    res.status(StatusCodes.OK).json(stepComponent)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const stepComponentId = req.params.id
    const result = await stepComponentService.deleteItem(stepComponentId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const stepComponentController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
