import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { paintTypeModel } from '~/models/product/properties/paintTypeModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColor = {
      ...reqBody
    }
    const createPaintType = await paintTypeModel.createNew(newColor)
    return createPaintType
  } catch (error) {
    throw error
  }
}

// const getDetails = async (colorId) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const color = await colorModel.getDetails(colorId)

//     if (!color)
//       throw new ApiError(StatusCodes.NOT_FOUND, 'Color not found!')
//     return color
//   } catch (error) {
//     throw error
//   }
// }

const getAll = async (limitNumber, offsetNumber) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const paintTypes = await paintTypeModel.getAll(limitNumber, offsetNumber)
    return paintTypes
  } catch (error) {
    throw error
  }
}
const update = async (paintTypeId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const paintType = await paintTypeModel.update(paintTypeId, updateData)
    return paintType
  } catch (error) {
    throw error
  }
}

const deleteItem = async (paintTypeId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetPaintType = await paintTypeModel.findOneById(paintTypeId)
    if (!targetPaintType)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await paintTypeModel.deleteOneById(paintTypeId)
    return {
      deleteResult: 'Color and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const paintTypeService = {
  createNew,
  getAll,
  update,
  deleteItem
}
