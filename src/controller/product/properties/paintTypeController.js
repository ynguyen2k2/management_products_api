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
// const getDetails = async (req, res, next) => {
//   try {
//     const productId = req.params.id

//     const product = await productService.getDetails(productId)
//     res.status(StatusCodes.OK).json(product)
//   } catch (error) {
//     next(error)
//   }
// }

const getAll = async (req, res, next) => {
  try {
    const { limit, page } = req.query

    const colors = await paintTypeService.getAll(limit, page)
    res.status(StatusCodes.OK).json(colors)
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
  update,
  deleteItem
}
