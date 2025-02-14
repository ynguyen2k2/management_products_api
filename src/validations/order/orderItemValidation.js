import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const conrectCondition = Joi.object({
    orderDetailId: Joi.number().required().min(1).max(100).strict(),
    productId: Joi.number().required().min(1).max(100).strict(),
    quantity: Joi.number().required().min(1).max(100).strict(),
    price: Joi.number().min(1).max(100).strict()
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
    orderDetailId: Joi.number().min(1).max(100).strict(),
    productId: Joi.number().min(1).max(100).strict(),
    quantity: Joi.number().min(1).max(100).strict(),
    price: Joi.number().min(1).max(100).strict()
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

export const orderItemValidation = {
  createNew,
  update
}
