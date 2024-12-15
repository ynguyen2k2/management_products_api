import { slugify } from '~/utils/formatter'
import { productModel } from '~/models/product/productModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newProductSKU = {
      ...reqBody
    }
    // console.log("🚀 ~ file: productService.js:10 ~ newProduct:", newProduct)

    const createProductSKU = await productModel.createNew(newProductSKU)
    return createProductSKU
  } catch (error) {
    throw error
  }
}

const getDetails = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const product = await productModel.getDetails(productId)

    console.log('🚀 ~ file: productService.js:27 ~ product:', product)
    if (!product)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!')
    return product
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
    const product = await productModel.update(productId, updateData)
    return product
  } catch (error) {
    throw error
  }
}

const deleteItem = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetProduct = await productModel.findOneById(productId)
    if (!targetProduct)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await productModel.deleteOneById(productId)
    return {
      deleteResult: 'Product and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const productService = {
  createNew,
  getDetails,
  update,
  deleteItem
}
