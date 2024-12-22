import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { rawMaterialModel } from '~/models/product/properties/rawMaterialModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColor = {
      ...reqBody
    }
    const createRawMaterial = await rawMaterialModel.createNew(newColor)
    return createRawMaterial
  } catch (error) {
    throw error
  }
}

const getDetails = async (rawMaterialId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const rawMaterial = await rawMaterialModel.getDetails(rawMaterialId)

    if (!rawMaterial)
      throw new ApiError(StatusCodes.NOT_FOUND, 'rawMaterial not found!')
    return rawMaterial
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const rawMaterials = await rawMaterialModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return rawMaterials
  } catch (error) {
    throw error
  }
}
const update = async (rawMaterialId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const rawMaterial = await rawMaterialModel.update(rawMaterialId, updateData)
    return rawMaterial
  } catch (error) {
    throw error
  }
}

const deleteItem = async (rawMaterialId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetRawMaterial = await rawMaterialModel.findOneById(rawMaterialId)
    if (!targetRawMaterial)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await rawMaterialModel.deleteOneById(rawMaterialId)
    return {
      deleteResult:
        'Raw Material and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const rawMaterialService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
