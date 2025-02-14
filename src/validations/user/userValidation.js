import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const conrectCondition = Joi.object({
    firstName: Joi.string().required().min(3).max(100).trim().strict(),
    lastName: Joi.string().required().min(3).max(100).trim().strict(),
    userName: Joi.string().required().min(3).max(100).trim().strict(),
    email: Joi.string().email().required().trim(),
    role: Joi.string()
      .required()
      .min(3)
      .max(100)
      .trim()
      .strict()
      .default('user'),
    avatar: Joi.string().uri().trim(),
    password: Joi.string().min(8).trim().strict()
  })
  try {
    console.log('🚀 ~ req.body:', typeof req.body.password)

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
    firstname: Joi.string().required().min(3).max(100).trim().strict(),
    lastname: Joi.string().required().min(3).max(100).trim().strict(),
    username: Joi.string().required().min(3).max(100).trim().strict(),
    email: Joi.string().email().required().trim(),
    role: Joi.string()
      .required()
      .min(3)
      .max(100)
      .trim()
      .strict()
      .default('user'),
    avatar: Joi.string().uri().trim()
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

const resetPassword = async (req, res, next) => {
  const conrectCondition = Joi.object({
    password: Joi.string().min(8).trim().strict(),
    passwordConfirm: Joi.string().min(8).trim().strict()
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

const updatePassword = async (req, res, next) => {
  const conrectCondition = Joi.object({
    passwordCurrent: Joi.string().min(8).trim().strict(),
    newPassword: Joi.string().min(8).trim().strict(),
    passwordConfirm: Joi.string().min(8).trim().strict()
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

export const userValidation = {
  createNew,
  update,
  resetPassword,
  updatePassword
}
