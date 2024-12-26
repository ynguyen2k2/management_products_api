import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { productSKUModel } from '~/models/product/productSKUModel'
import { quatityComponentModel } from '~/models/product/component/quatityComponent'

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

    const createQuatityComponent = await quatityComponentModel.createNew(
      productSkuId,
      newComponent
    )
    return createQuatityComponent
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

    const quatityComponent = await quatityComponentModel.getDetails(
      componentId,
      productSkuId,
      productSkuId
    )

    if (!quatityComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component not found!')
    return quatityComponent
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

    const quatityComponents = await quatityComponentModel.getAll({
      limit,
      offset,
      sort,
      filter,
      productSkuId
    })
    return quatityComponents
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
    const quatityComponent = await quatityComponentModel.update(
      componentId,
      productSkuId,
      updateData
    )
    if (!quatityComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component Not Found!')
    return quatityComponent
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

    const targetQuatityComponent =
      await quatityComponentModel.findOneById(componentId)

    if (!targetQuatityComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component Not Found!')

    await quatityComponentModel.deleteOneById(componentId, productSkuId)
    return {
      deleteResult:
        'Quatity Components and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const quatityComponentService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
