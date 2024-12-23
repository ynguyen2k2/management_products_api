import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const conrectCondition = Joi.object({
    name: Joi.string().min(3).max(100).trim().strict(),
    productId: Joi.number().min(1),
    colorId: Joi.number().min(1),
    rawMaterialId: Joi.number().min(1),
    quatity: Joi.number().min(1),
    dimension: Joi.string().min(1).max(50).trim()
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
    name: Joi.string().min(3).max(100).trim().strict(),
    productId: Joi.number().min(1),
    colorId: Joi.number().min(1),
    rawMaterialId: Joi.number().min(1),
    quatity: Joi.number().min(1),
    dimension: Joi.string().min(1).max(50).trim()
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

export const componentValidation = {
  createNew,
  update
}
