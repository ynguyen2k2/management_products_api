import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const conrectCondition = Joi.object({
    productId: Joi.number().required().min(1),
    colorAttributeId: Joi.number().min(1),
    paintTypeAttributeId: Joi.number(),
    internalCodeAttribute: Joi.string().max(20).trim().required()
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
    productid: Joi.number().min(1),
    colorattributeid: Joi.number().min(1),
    painttypeattributeid: Joi.number,
    internalcodeattibute: Joi.string().max(20).trim()
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

export const productSKUValidation = {
  createNew,
  update
}
