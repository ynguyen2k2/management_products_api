import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/user/userModel'
import { authService } from './authService'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const emailUser = reqBody.email
    const user = await userModel.findOneByEmail(emailUser)
    if (user) throw new ApiError(StatusCodes.CONFLICT, 'User already exists!')

    const passwordUser = await authService.saveModifiedPassword(
      reqBody.password
    )
    const newUser = {
      ...reqBody,
      password: passwordUser,
      passwordConfirm: undefined
    }

    const createUser = await userModel.createNew(newUser)
    return createUser
  } catch (error) {
    throw error
  }
}

const getDetails = async (userId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await userModel.getDetails(userId)

    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    return user
  } catch (error) {
    throw error
  }
}

const getUserByEmail = async (email) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await userModel.findOneByEmail(email)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    return user
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const users = await userModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return users
  } catch (error) {
    throw error
  }
}
const update = async (userId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const user = await userModel.update(userId, updateData)
    return user
  } catch (error) {
    throw error
  }
}

const deleteItem = async (userId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetUser = await userModel.findOneById(userId)
    if (!targetUser)
      throw new ApiError(StatusCodes.NOT_FOUND, 'User Not Found!')
    await userModel.deleteOneById(userId)
    return {
      deleteResult: 'User and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const userService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
