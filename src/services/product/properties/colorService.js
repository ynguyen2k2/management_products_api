import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { colorModel } from '~/models/product/properties/colorModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColor = {
      ...reqBody
    }
    const createColor = await colorModel.createNew(newColor)
    return createColor
  } catch (error) {
    throw error
  }
}

const getDetails = async (colorId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const color = await colorModel.getDetails(colorId)

    if (!color) throw new ApiError(StatusCodes.NOT_FOUND, 'Color not found!')
    return color
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const colors = await colorModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return colors
  } catch (error) {
    throw error
  }
}
const update = async (colorId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const color = await colorModel.update(colorId, updateData)
    return color
  } catch (error) {
    throw error
  }
}

const deleteItem = async (colorId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetColor = await colorModel.findOneById(colorId)
    if (!targetColor)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await colorModel.deleteOneById(colorId)
    return {
      deleteResult: 'Color and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const colorService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
