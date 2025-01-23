import express from 'express'
import { paintTypeController } from '~/controller/product/properties/paintTypeController'
import { paintTypeValidation } from '~/validations/product/properties/paintTypeValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'

const Router = express.Router()

Router.route('/')
  .get(validatePaginationParams.validateQuery, paintTypeController.getAll)
  .post(paintTypeValidation.createNew, paintTypeController.createNew)
Router.route('/:id')
  .get(paintTypeController.getDetails)
  // update product
  .patch(paintTypeValidation.update, paintTypeController.update)
  .delete(paintTypeController.deleteItem)

export const paintTypeRoute = Router
