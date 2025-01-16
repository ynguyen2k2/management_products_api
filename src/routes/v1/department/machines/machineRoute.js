import express from 'express'
import { machineController } from '~/controller/department/machines/machineController'
import { machineValidation } from '~/validations/department/machines/machineValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'
import { operationRoute } from '../operations/operationRoute'

const Router = express.Router()
Router.use('/:machineId/operations', operationRoute)
Router.route('/')
  .get(validatePaginationParams.validateQuery, machineController.getAll)
  .post(machineValidation.createNew, machineController.createNew)
Router.route('/:id')
  .get(machineController.getDetails)
  // update product
  .patch(machineValidation.update, machineController.update)
  .delete(machineController.deleteItem)

export const machineRoute = Router
