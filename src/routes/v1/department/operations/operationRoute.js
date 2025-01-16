import express from 'express'
import { operationController } from '~/controller/department/operations/operationController'
import { operationValidation } from '~/validations/department/operations/operationValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'

const Router = express.Router()

Router.route('/')
  .get(validatePaginationParams.validateQuery, operationController.getAll)
  .post(operationValidation.createNew, operationController.createNew)
Router.route('/:id')
  .get(operationController.getDetails)
  // update product
  .patch(operationValidation.update, operationController.update)
  .delete(operationController.deleteItem)

export const operationRoute = Router
