import { StatusCodes } from 'http-status-codes'
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

    const product = await productService.getDetails(productId)
    res.status(StatusCodes.OK).json(product)
  } catch (error) {
    next(error)
  }
}

// const update = async (req, res, next) => {
//   try {
//     const productId = req.params.id
//     const product = await productService.update(productId, req.body)
//     res.status(StatusCodes.OK).json(product)
//   } catch (error) {
//     next(error)
//   }
// }

// const deleteItem = async (req, res, next) => {
//   try {
//     const productId = req.params.id
//     const result = await productService.deleteItem(productId)
//     res.status(StatusCodes.OK).json(result)
//   } catch (error) {
//     next(error)
//   }
// }

export const productController = {
  createNew,
  getDetails
  //   update,
  //   deleteItem
}
