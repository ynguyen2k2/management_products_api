import { StatusCodes } from 'http-status-codes'
import { colorService } from '~/services/product/properties/colorService'
const createNew = async (req, res, next) => {
  try {
    const createColor = await colorService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createColor)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const colorId = req.params.id

    const color = await colorService.getDetails(colorId)
    res.status(StatusCodes.OK).json(color)
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

    const colors = await colorService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(colors)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const colorId = req.params.id
    const color = await colorService.update(colorId, req.body)
    res.status(StatusCodes.OK).json(color)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const colorId = req.params.id
    const result = await colorService.deleteItem(colorId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const colorController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
