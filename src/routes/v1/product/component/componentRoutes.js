import express from 'express'
import { componentController } from '~/controller/product/component/componentController'
import { componentValidation } from '~/validations/product/component/componentValidation'
import { validatePaginationParams } from '~/validations/product/validatePaginationParams'

const Router = express.Router({ mergeParams: true })

Router.route('/')
  .get(validatePaginationParams.validateQuery, componentController.getAll)
  .post(componentValidation.createNew, componentController.createNew)
Router.route('/:id')
  .get(componentController.getDetails)
  // update product
  .patch(componentValidation.update, componentController.update)
  .delete(componentController.deleteItem)

export const componentRoute = Router
