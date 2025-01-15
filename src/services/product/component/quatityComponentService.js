import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { productSKUModel } from '~/models/product/productSKUModel'
import { quantityComponentModel } from '~/models/product/component/quantityCompoentModel'

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

    const createQuantityComponent = await quantityComponentModel.createNew(
      productSkuId,
      newComponent
    )
    return createQuantityComponent
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

    const quantityComponent = await quantityComponentModel.getDetails(
      componentId,
      productSkuId,
      productSkuId
    )

    if (!quantityComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component not found!')
    return quantityComponent
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

    const quantityComponents = await quantityComponentModel.getAll({
      limit,
      offset,
      sort,
      filter,
      productSkuId
    })
    return quantityComponents
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
    const quantityComponent = await quantityComponentModel.update(
      componentId,
      productSkuId,
      updateData
    )
    if (!quantityComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component Not Found!')
    return quantityComponent
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

    const targetQuantityComponent =
      await quantityComponentModel.findOneById(componentId)

    if (!targetQuantityComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Component Not Found!')

    await quantityComponentModel.deleteOneById(componentId, productSkuId)
    return {
      deleteResult:
        'Quantity Components and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const quantityComponentService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
