import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { operationModel } from '~/models/department/operations/operationModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newOperation = {
      ...reqBody
    }
    const createOperation = await operationModel.createNew(newOperation)
    return createOperation
  } catch (error) {
    throw error
  }
}

const getDetails = async (operationId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const operation = await operationModel.getDetails(operationId)

    if (!operation)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Color not found!')
    return operation
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const operations = await operationModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return operations
  } catch (error) {
    throw error
  }
}
const update = async (operationId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const operation = await operationModel.update(operationId, updateData)
    return operation
  } catch (error) {
    throw error
  }
}

const deleteItem = async (operationId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetOperation = await operationModel.findOneById(operationId)
    if (!targetOperation)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await operationModel.deleteOneById(operationId)
    return {
      deleteResult: 'Operation and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const operationService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
