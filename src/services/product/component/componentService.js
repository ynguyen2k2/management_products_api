import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { componentModel } from '~/models/product/component/componentModel'
import { productSKUModel } from '~/models/product/productSKUModel'

const createNew = async (productSkuId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const productSku = productSKUModel.findOneById(productSkuId)
    if (!productSku)
      throw new ApiError(StatusCodes.NOT_FOUND, 'SKU is not found')

    const newComponent = {
      ...reqBody
    }
    // console.log("🚀 ~ file: productService.js:10 ~ newProduct:", newProduct)

    const createComponent = await componentModel.createNew(
      productSkuId,
      newComponent
    )
    return createComponent
  } catch (error) {
    throw error
  }
}

const getDetails = async (componentId, productSkuId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const productSku = productSKUModel.findOneById(productSkuId)
    if (!productSku)
      throw new ApiError(StatusCodes.NOT_FOUND, 'SKU is not found')

    const component = await componentModel.getDetails(
      componentId,
      productSkuId,
      productSkuId
    )

    if (!component)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component not found!')
    return component
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter, productSkuId }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const productSku = productSKUModel.findOneById(productSkuId)
    if (!productSku)
      throw new ApiError(StatusCodes.NOT_FOUND, 'SKU is not found')

    const components = await componentModel.getAll({
      limit,
      offset,
      sort,
      filter,
      productSkuId
    })
    return components
  } catch (error) {
    throw error
  }
}
const update = async (componentId, productSkuId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const productSku = productSKUModel.findOneById(productSkuId)
    if (!productSku)
      throw new ApiError(StatusCodes.NOT_FOUND, 'SKU is not found')

    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const component = await componentModel.update(
      componentId,
      productSkuId,
      updateData
    )
    if (!component)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component Not Found!')
    return component
  } catch (error) {
    throw error
  }
}

const deleteItem = async (componentId, productSkuId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const productSku = productSKUModel.findOneById(productSkuId)
    if (!productSku)
      throw new ApiError(StatusCodes.NOT_FOUND, 'SKU is not found')

    const targetComponent = await componentModel.findOneById(componentId)

    if (!targetComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component Not Found!')

    await componentModel.deleteOneById(componentId, productSkuId)
    return {
      deleteResult: 'Component and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const componentService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
