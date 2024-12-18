import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/product/productService'
const createNew = async (req, res, next) => {
  try {
    const createProduct = await productService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createProduct)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const productId = req.params.id

    const product = await productService.getDetails(productId)
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

    const products = await productService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(products)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await productService.update(productId, req.body)
    res.status(StatusCodes.OK).json(product)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const productId = req.params.id
    const result = await productService.deleteItem(productId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
