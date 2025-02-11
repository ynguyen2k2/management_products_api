import express from 'express'
import { userController } from '~/controller/user/userController'
import { validatePaginationParams } from '~/validations/product/validatePaginationParams'
import { userValidation } from '~/validations/user/userValidation'

const Router = express.Router()

Router.route('/')
  .get(validatePaginationParams.validateQuery, userController.getAll)
  .post(userValidation.createNew, userController.createNew)
Router.route('/me').get(userController.getDetails)
Router.route('/:id')
  .get(userController.getDetails)
  // update product
  .patch(userValidation.update, userController.update)
  .delete(userController.deleteItem)

export const userRoute = Router
