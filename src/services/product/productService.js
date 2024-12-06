import { slugify } from '~/utils/formatter'
import { productModel } from '~/models/product/productModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newProduct = {
      ...reqBody,
      slug: slugify(reqBody.name)
    }
    // console.log("🚀 ~ file: productService.js:10 ~ newProduct:", newProduct)

    const createProduct = await productModel.createNew(newProduct)
    return createProduct
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


export const productService = {
  createNew,
  getDetails,
  update
}