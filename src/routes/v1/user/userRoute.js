import express from 'express'
import { authController } from '~/controller/user/authController'
import { userController } from '~/controller/user/userController'
import { validatePaginationParams } from '~/validations/product/validatePaginationParams'
import { userValidation } from '~/validations/user/userValidation'

const Router = express.Router()

Router.post('/login', authController.login)
Router.post('/signup', authController.signup)
Router.get('/logout', authController.logout)

Router.post('/forgotPassword', authController.forgotPassword)
Router.route('/resetPassword/:token').patch(
  userValidation.resetPassword,
  authController.resetPassword
)

Router.use(authController.protect)
Router.patch(
  '/updateMypassword',
  userValidation.updatePassword,
  authController.updatePassword
)
Router.route('/me').get(userController.getMe, userController.getDetails)
Router.route('/updateMe').patch(userValidation.update, userController.update)

// Router.delete('/deleteMe', userController.deleteItem)

//admin only
Router.use(authController.restrictTo('admin'))
Router.route('/')
  .get(validatePaginationParams.validateQuery, userController.getAll)
  .post(userValidation.createNew, userController.createNew)

Router.route('/:id')
  .get(userController.getDetails)
  .patch(userValidation.update, userController.update)
  .delete(userController.deleteItem)

export const userRoute = Router
