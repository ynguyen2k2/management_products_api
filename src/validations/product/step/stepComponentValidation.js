import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const conrectCondition = Joi.object({
    componentid: Joi.number().required(),
    operationid: Joi.number().required(),
    step: Joi.number().min(1).max(100),
    note: Joi.string().min(3).max(100).trim(),
    cycletime: Joi.number().min(1).max(10).required(),
    quantitycycletime: Joi.number().min(1).max(10).required(),
    workerquantity: Joi.number().min(1).max(10).required()
  })
  try {
    await conrectCondition.validateAsync(req.body, { abortEarly: false })

    // console.log('🚀 ~ file: productValidation.js:36 ~ req.body:', req.body)
    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

const update = async (req, res, next) => {
  const conrectCondition = Joi.object({
    componentid: Joi.number(),
    operationid: Joi.number(),
    step: Joi.number().min(1).max(100),
    note: Joi.string().min(3).max(100).trim(),
    cycletime: Joi.number().min(1).max(10),
    quantitycycletime: Joi.number().min(1).max(10),
    workerquantity: Joi.number().min(1).max(10)
  })
  try {
    await conrectCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })

    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

export const stepComponentValidation = {
  createNew,
  update
}
