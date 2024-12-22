import express from 'express'
import { colorController } from '~/controller/product/properties/colorController'
import { colorValidation } from '~/validations/product/properties/colorValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'

const Router = express.Router()

Router.route('/')
  .get(validatePaginationParams.validateQuery, colorController.getAll)
  .post(colorValidation.createNew, colorController.createNew)
Router.route('/:id')
  // .get(co.getDetails)
  // update product
  .patch(colorValidation.update, colorController.update)
  .delete(colorController.deleteItem)

export const colorRoute = Router
