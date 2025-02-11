import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/user/userModel'
import ApiError from '~/utils/ApiError'
const saveModifiedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12)
  return hashedPassword
}
const timePasswordChange = () => {
  return Date.now() - 1000
}

const correctPassword = async (candidatePasword, userPassword) => {
  return await bcrypt.compare(candidatePasword, userPassword)
}

const changePasswordAfter = async (passwordChangeAt, JWTTimestamp) => {
  if (passwordChangeAt) {
    const changedTimestamp = parseInt(passwordChangeAt.getTime() / 1000, 10)

    return JWTTimestamp < changedTimestamp
  }
  return false
}

const createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex')
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  const passwordResetExpires = Date.now() + 10 * 60 * 1000
  return { passwordResetToken, passwordResetExpires }
}

const updateAuth = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { userId, password, passwordResetToken, passwordResetExpires } =
      reqBody
    const user = await userModel.findOneById(userId)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
    const updateData = {
      passwordResetToken,
      passwordResetExpires,
      password,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const updateAuth = await userModel.updateAuth(userId, updateData)
    return updateAuth
  } catch (error) {
    throw error
  }
}

export const authService = {
  saveModifiedPassword,
  timePasswordChange,
  changePasswordAfter,
  correctPassword,
  createPasswordResetToken,
  updateAuth
}
