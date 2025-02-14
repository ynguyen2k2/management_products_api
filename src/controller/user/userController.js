import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/user/userService'

const createNew = async (req, res, next) => {
  try {
    const createUser = await userService.createNew(req.body)

    console.log('🚀 ~ createUser:', createUser)

    res.status(StatusCodes.CREATED).json(createUser)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await userService.getDetails(userId)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}
const getMe = async (req, res, next) => {
  try {
    console.log('🚀 ~ userController.js:29 ~ req.user:', req.user)
    req.params.id = req.user.id

    next()
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const sort = req.query.sort || 'asc'
    const filter = req.query.filter || 'id'
    const offset = (page - 1) * limit

    const users = await userService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await userService.update(userId, req.body)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const userId = req.params.id
    const result = await userService.deleteItem(userId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createNew,
  getDetails,
  getAll,
  update,
  getMe,
  deleteItem
}
