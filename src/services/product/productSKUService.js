import { StatusCodes } from 'http-status-codes'
import { productSKUModel } from '~/models/product/productSKUModel'
import ApiError from '~/utils/ApiError'
// import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newProductSKU = {
      ...reqBody
    }
    // console.log("🚀 ~ file: productService.js:10 ~ newProduct:", newProduct)

    const createProductSKU = await productSKUModel.createNew(newProductSKU)
    return createProductSKU
  } catch (error) {
    throw error
  }
}

const getDetails = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const product = await productSKUModel.getDetails(productId)

    if (!product)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!')
    return product
  } catch (error) {
    throw error
  }
}

const getAllProduct = async (limitNumber, offsetNumber) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const products = await productSKUModel.getAllProduct(
      limitNumber,
      offsetNumber
    )
    return products
  } catch (error) {
    throw error
  }
}

const update = async (productId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const product = await productSKUModel.update(productId, updateData)
    return product
  } catch (error) {
    throw error
  }
}

const deleteItem = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetProductSKU = await productSKUModel.findOneById(productId)
    if (!targetProductSKU)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await productSKUModel.deleteOneById(productId)
    return {
      deleteResult: 'ProductSKU and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const productSKUService = {
  createNew,
  getDetails,
  getAllProduct,
  update,
  deleteItem
}
