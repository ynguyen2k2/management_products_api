import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { componentModel } from '~/models/product/component/componentModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newComponent = {
      ...reqBody
    }
    // console.log("🚀 ~ file: productService.js:10 ~ newProduct:", newProduct)

    const createComponent = await componentModel.createNew(newComponent)
    return createComponent
  } catch (error) {
    throw error
  }
}

const getDetails = async (componentId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const component = await componentModel.getDetails(componentId)

    if (!component)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!')
    return component
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const components = await componentModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return components
  } catch (error) {
    throw error
  }
}
const update = async (componentId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const component = await componentModel.update(componentId, updateData)
    return component
  } catch (error) {
    throw error
  }
}

const deleteItem = async (componentId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetComponent = await componentModel.findOneById(componentId)
    if (!targetComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await componentModel.deleteOneById(componentId)
    return {
      deleteResult: 'Product and all its properties are deleted successfully'
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
