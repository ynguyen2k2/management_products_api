import { StatusCodes } from 'http-status-codes'
import { paintTypeService } from '~/services/product/properties/paintTypeService'
const createNew = async (req, res, next) => {
  try {
    const createPaintType = await paintTypeService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createPaintType)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const paintTypeId = req.params.id

    const paintType = await paintTypeService.getDetails(paintTypeId)
    res.status(StatusCodes.OK).json(paintType)
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

    const paintTypes = await paintTypeService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(paintTypes)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const colorId = req.params.id
    const color = await paintTypeService.update(colorId, req.body)
    res.status(StatusCodes.OK).json(color)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const colorId = req.params.id
    const result = await paintTypeService.deleteItem(colorId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const paintTypeController = {
  createNew,
  getAll,
  getDetails,
  update,
  deleteItem
}
