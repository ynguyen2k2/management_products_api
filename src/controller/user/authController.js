import crypto from 'crypto'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { env } from '~/config/enviroments'
import { userModel } from '~/models/user/userModel'
import { authService } from '~/services/user/authService'
import { userService } from '~/services/user/userService'
import ApiError from '~/utils/ApiError'

const signToken = (id) => {
  return jwt.sign({ id: id }, env.JWT_SECRET_KEY, {
    expiresIn: env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }
  if (env.BUILD_MODE === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)
  // Remove password output
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  })
}

const signup = async (req, res, next) => {
  try {
    const newUser = await userService.createNew(req.body)
    // const url = `${req.protocol}://${req.get('host')}/me`
    // await new Email(newUser, url).sendWelcome()
    createSendToken(newUser, 201, res)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // 1) Check if email and password exist
    if (!email || !password) {
      next(
        new ApiError(
          StatusCodes.NOT_FOUND,
          'Please provide email and password!'
        )
      )
    }
    const user = await userService.getUserByEmail(email)
    // 'pass1234' === '$2a$12$CZXznrsr2y5iSET2CLVmW.vWaEe/n8xXsPe.Gd7oOOUH9G.qdNUK2';
    // 2) Check if user exits && password is correct
    if (
      !user ||
      !(await authService.correctPassword(password, user.password))
    ) {
      next(
        new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password')
      )
    }
    delete user.password

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res)
  } catch (error) {
    next(error)
  }
}

const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({
    status: 'success'
  })
}

const protect = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt
    }

    if (!token) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          'You are not logged in! Please log in to get acees.'
        )
      )
    }
    //2)  Verification token
    const decoded = await promisify(jwt.verify)(token, env.JWT_SECRET_KEY)

    const currentUser = await userService.getDetails(decoded.id)

    if (!currentUser) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          'The user belonging to this token dose no longer exist....'
        )
      )
    }
    delete currentUser.password

    if (
      authService.changePasswordAfter(
        currentUser.passwordchangedat,
        decoded.iat
      )
    ) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          'User recently changed password! Please log in again'
        )
      )
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser
    res.locals.user = currentUser

    next()
  } catch (error) {
    next(error)
  }
}
const isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        env.JWT_SECRET
      )

      // 3) Check if user still exists
      const currentUser = await userService.getDetails(decoded.id)
      if (!currentUser) {
        return next()
      }
      // 4) Check if user changed password after the token was issued
      if (authService.changePasswordAfter(decoded.iat)) {
        return next()
      }
      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser
      return next()
    }
    next()
  } catch {
    return next()
  }
}

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          StatusCodes.FORBIDDEN,
          'You do not have permission to perform this action'
        )
      )
    }
    next()
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    // 1) get user base on email
    const email = req.body.email

    const user = await userService.getUserByEmail(email)

    if (!user) {
      return next(
        new ApiError(
          StatusCodes.NOT_FOUND,
          'There is no user with email address.'
        )
      )
    }
    // 2) Generate the random reset token
    const { resetToken, passwordResetToken, passwordResetExpires } =
      authService.createPasswordResetToken()
    // 3) Send it to user's email
    await authService.updateAuth({
      userId: user.id,
      passwordResetToken,
      passwordResetExpires: new Date(passwordResetExpires).toISOString()
    })

    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`

    // await new Email(user, resetURL).sendPasswordReset()
    res.status(200).json({
      status: 'success',
      url: resetURL,
      expiresIn: new Date(passwordResetExpires).toISOString(),
      meessage: 'Token is sent'
    })
  } catch (err) {
    // user.passwordResetToken = undefined
    // user.passwordResetExpires = undefined
    // return next(
    //   new ApiError(
    //     StatusCodes.INTERNAL_SERVER_ERROR,
    //     'There was an error sending the email. try again later!'
    //   )
    // )
    next(err)
  }
}
const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex')

    const user = await userModel.findOneByToken(hashedToken)

    console.log('🚀 ~ authController.js:250 ~ user:', user)
    if (!user) {
      return next(
        new ApiError(StatusCodes.BAD_REQUEST, 'Token is invalid or has expired')
      )
    }
    const password = req.body.password
    const passwordConfirm = req.body.passwordConfirm
    if (password !== passwordConfirm) {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          'Password and confirm password do not match'
        )
      )
    }
    const modifiedPassword = authService.saveModifiedPassword(req.body.password)
    await authService.updateAuth({
      userId: user.id,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
      password: modifiedPassword
    })

    const token = signToken(user._id)
    res.status(200).json({
      status: 'success',
      token
    })
  } catch (error) {
    next(error)
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const user = await userService.getDetails(req.user.id)
    const { passwordCurrent, newPassword, passwordConfirm } = req.body

    if (
      !user.password ||
      !authService.correctPassword(passwordCurrent, user.password)
    )
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          'Your current password is wrong.'
        )
      )
    if (newPassword !== passwordConfirm) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          'New Password and Confirm Password do not match'
        )
      )
    }
    const password = authService.saveModifiedPassword(passwordCurrent)
    await authService.updateAuth({
      userId: user.id,
      password,
      passwordChangedAt: new Date(Date.now() - 1000).toISOString()
    })
    createSendToken(user, 200, res)
  } catch (error) {
    next(error)
  }
}

export const authController = {
  signToken,
  createSendToken,
  signup,
  login,
  logout,
  protect,
  isLoggedIn,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword
}
