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
  // eslint-disable-next-line no-useless-catch
  try {
    return await bcrypt.compare(candidatePasword, userPassword)
  } catch {
    throw error
  }
}

const changePasswordAfter = (passwordChangeAt, JWTTimestamp) => {
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
  const passwordResetExpires = new Date(
    Date.now() + 7 * 60 * 60 * 1000 + 10 * 60 * 1000
  )
  return { resetToken, passwordResetToken, passwordResetExpires }
}

const updateAuth = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { userId, ...updateAuthData } = reqBody
    const user = await userModel.findOneById(userId)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')

    // new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString()
    const updateAuth = await userModel.updateAuth(userId, updateAuthData)
    delete updateAuth.password
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
