import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { departmentModel } from '~/models/department/departmentModel'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newDepartment = {
      ...reqBody
    }
    const createDepartment = await departmentModel.createNew(newDepartment)
    return createDepartment
  } catch (error) {
    throw error
  }
}

const getDetails = async (departmentId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const department = await departmentModel.getDetails(departmentId)
    const result = cloneDeep(department)
    const departments = result

    if (!department)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Color not found!')
    return departmentv
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const departments = await departmentModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return departments
  } catch (error) {
    throw error
  }
}
const update = async (departmentId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const department = await departmentModel.update(departmentId, updateData)
    return department
  } catch (error) {
    throw error
  }
}

const deleteItem = async (departmentId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetDepartment = await departmentModel.findOneById(departmentId)
    if (!targetDepartment)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await departmentModel.deleteOneById(departmentId)
    return {
      deleteResult: 'Department and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const departmentService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
