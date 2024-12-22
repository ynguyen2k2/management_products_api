import { StatusCodes } from 'http-status-codes'
import { productSKUService } from '~/services/product/productSKUService'
const createNew = async (req, res, next) => {
  try {
    const createProductSKU = await productSKUService.createNew(req.body)
    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createProductSKU)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await productSKUService.getDetails(productId)
    res.status(StatusCodes.OK).json(product)
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

    const productsSKU = await productSKUService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(productsSKU)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const productskuId = req.params.id
    const productSKU = await productSKUService.update(productskuId, req.body)
    res.status(StatusCodes.OK).json(productSKU)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const productId = req.params.id
    const result = await productSKUService.deleteItem(productId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const productSKUController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
