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
    const departmentClone = cloneDeep(result)

    const departments = departmentClone.reduce((pre, cur) => {
      const existDepartment = pre.filter((el) => el.id === cur.departmentid)
      if (!existDepartment.length) {
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
        const existMachine = existDepartment[0].machines.filter(
          (machine) => machine.id === cur.machineid
        )

        if (!existMachine.length) {
          const machine = {
            id: cur.machineid,
            name: cur.machinename,
            operations: [{ id: cur.operationid, name: cur.operationname }]
          }
          pre.forEach((el) => {
            if (el.id === cur.departmentid) el.machines.push(machine)
          })
        } else {
          const operation = { id: cur.operationid, name: cur.operationname }
          pre.forEach((department) => {
            if (department.id === cur.departmentid)
              department.machines.forEach((machine) => {
                if (machine.id === cur.machineid)
                  machine.operations.push(operation)
              })
          })
        }
      }
      return pre
    }, [])

    if (!departments)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Department is not found!')
    return departments
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

    if (!departments)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Departments are not found!')

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
      throw new ApiError(StatusCodes.NOT_FOUND, 'Department Is Not Found!')
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
