import { StatusCodes } from 'http-status-codes'
import { rawMaterialService } from '~/services/product/properties/rawMaterailService'
const createNew = async (req, res, next) => {
  try {
    const createRawMaterial = await rawMaterialService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createRawMaterial)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const rawMaterialId = req.params.id

    const rawMaterial = await rawMaterialService.getDetails(rawMaterialId)
    res.status(StatusCodes.OK).json(rawMaterial)
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

    const rawMaterials = await rawMaterialService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(rawMaterials)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const rawMaterialId = req.params.id
    const rawMaterial = await rawMaterialService.update(rawMaterialId, req.body)
    res.status(StatusCodes.OK).json(rawMaterial)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const rawMaterialId = req.params.id
    const result = await rawMaterialService.deleteItem(rawMaterialId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const rawMaterialController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
