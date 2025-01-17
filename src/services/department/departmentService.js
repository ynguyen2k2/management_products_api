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
    const result = await departmentModel.getDetails(departmentId)
    const department = cloneDeep(result)

    const departments = department.reduce((pre, cur) => {
      const existDepartmentLength = pre.filter(
        (el) => el.id === cur.departmentid
      ).length
      if (!existDepartmentLength) {
        pre.push({
          id: cur.departmentid,
          name: cur.departmentname,
          machines: [
            {
              id: cur.machineid,
              name: cur.machinename,
              operations: [{ id: cur.operationid, name: cur.operationname }]
            }
          ],
          createdAt: cur.createdat,
          updatedAtL: cur.updatedat
        })
      } else {
        {
          const machine = {
            id: cur.machineid,
            name: cur.machines,
            operations: [{ id: cur.operationid, name: cur.operationname }]
          }
          pre.forEach((el) => {
            if (el.id === cur.departmentid) el.machines.push(machine)
          })
        }
      }
      return pre
    }, [])

    if (!departments)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Department not found!')
    return departments
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await departmentModel.getAll({
      limit,
      offset,
      sort,
      filter
    })

    const departmentsClone = cloneDeep(result)

    const departments = departmentsClone.reduce((pre, cur) => {
      const existDepartmentLength = pre.filter(
        (el) => el.id === cur.departmentid
      ).length
      if (!existDepartmentLength) {
        pre.push({
          id: cur.departmentid,
          name: cur.departmentname,
          machines: [
            {
              id: cur.machineid,
              name: cur.machinename,
              operations: [{ id: cur.operationid, name: cur.operationname }]
            }
          ],
          createdAt: cur.createdat,
          updatedAtL: cur.updatedat
        })
      } else {
        {
          const machine = {
            id: cur.machineid,
            name: cur.machines,
            operations: [{ id: cur.operationid, name: cur.operationname }]
          }
          pre.forEach((el) => {
            if (el.id === cur.departmentid) el.machines.push(machine)
          })
        }
      }
      return pre
    }, [])

    if (!departments)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Department not found!')

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
