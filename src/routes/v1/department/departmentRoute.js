import express from 'express'
import { departmentController } from '~/controller/department/departmentController'
import { departmentValidation } from '~/validations/department/departmentValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'
import { machineRoute } from './machines/machineRoute'

const Router = express.Router()

Router.use('/:departmendId/machines', machineRoute)

Router.route('/')
  .get(validatePaginationParams.validateQuery, departmentController.getAll)
  .post(departmentValidation.createNew, departmentController.createNew)
Router.route('/:id')
  .get(departmentController.getDetails)
  // update product
  .patch(departmentValidation.update, departmentController.update)
  .delete(departmentController.deleteItem)

export const departmentRoute = Router
