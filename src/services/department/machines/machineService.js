import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { machineModel } from '~/models/department/machines/machineModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newMachine = {
      ...reqBody
    }
    const createMachine = await machineModel.createNew(newMachine)
    return createMachine
  } catch (error) {
    throw error
  }
}

const getDetails = async (machineId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const machine = await machineModel.getDetails(machineId)

    if (!machine) throw new ApiError(StatusCodes.NOT_FOUND, 'Color not found!')
    return machine
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const machines = await machineModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return machines
  } catch (error) {
    throw error
  }
}
const update = async (machineId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const machine = await machineModel.update(machineId, updateData)
    return machine
  } catch (error) {
    throw error
  }
}

const deleteItem = async (machineId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetMachine = await machineModel.findOneById(machineId)
    if (!targetMachine)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await machineModel.deleteOneById(machineId)
    return {
      deleteResult: 'Machine and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const machineService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
