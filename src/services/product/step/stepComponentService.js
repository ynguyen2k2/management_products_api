import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { stepComponentModel } from '~/models/product/step/stepComponentModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newStepComponent = {
      ...reqBody
    }
    const createStepComponent =
      await stepComponentModel.createNew(newStepComponent)
    return createStepComponent
  } catch (error) {
    throw error
  }
}

const getDetails = async (stepComponentId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const color = await stepComponentModel.getDetails(stepComponentId)

    if (!color)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Step Component not found!')
    return color
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const stepComponents = await stepComponentModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return stepComponents
  } catch (error) {
    throw error
  }
}
const update = async (stepComponentId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const stepComponent = await stepComponentModel.update(
      stepComponentId,
      updateData
    )
    return stepComponent
  } catch (error) {
    throw error
  }
}

const deleteItem = async (stepComponentId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetStepComponent =
      await stepComponentModel.findOneById(stepComponentId)
    if (!targetStepComponent)
      throw new ApiError(StatusCodes.NOT_FOUND, 'StepComponent Is Not Found!')
    await stepComponentModel.deleteOneById(stepComponentId)
    return {
      deleteResult: 'Color and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const stepComponentService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
