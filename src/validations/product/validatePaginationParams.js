import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const validateQuery = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 5
  const page = parseInt(req.query.page) || 1

  console.log(
    '🚀 ~ file: validatePaginationParams.js:11 ~ validateQuery ~  req.query:',
    req.query
  )
  if (limit > 100) {
    next(
      new ApiError(
        StatusCodes.BAD_REQUEST,
        'Limit cannot exceed 100 items per page'
      )
    )
  }

  if (limit < 0) {
    next(
      new ApiError(
        StatusCodes.BAD_REQUEST,
        'Limit cannot negative items per page'
      )
    )
  }

  if (page < 1) {
    next(
      new ApiError(
        StatusCodes.BAD_REQUEST,
        'Limit cannot exceed 100 items per page'
      )
    )
  }
  next()
}

export const validatePaginationParams = {
  validateQuery
}
