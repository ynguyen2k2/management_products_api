import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { machineModel } from '~/models/department/machines/machineModel'
import { cloneDeep } from 'lodash'

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
    const result = await machineModel.getDetails(machineId)
    const machineClone = cloneDeep(result)

    const machines = machineClone.reduce((pre, cur) => {
      console.log('🚀 ~ file: machineService.js:26 ~ machines ~ cur:', cur)
      const exsitMachine = pre.filter((el) => el.id === cur.machineid)
      if (!exsitMachine.length) {
        pre.push({
          id: cur.machineid,
          name: cur.machinename,
          departmentId: cur.departmentid,
          departmentName: cur.departmentname,
          operations: [{ id: cur.operationid, name: cur.operationname }],
          createdAt: cur.createdat,
          updatedAtL: cur.updatedat
        })
      } else {
        const operation = { id: cur.operationid, name: cur.operationname }
        pre.forEach((el) => {
          if (el.id === cur.machineid) el.operations.push(operation)
        })
      }
      return pre
    }, [])

    if (!machines)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Machine is not found!')
    return machines
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
    if (!machines)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Machine are not found!')
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
      throw new ApiError(StatusCodes.NOT_FOUND, 'Machine Is Not Found!')
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
