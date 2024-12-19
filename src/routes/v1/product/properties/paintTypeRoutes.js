import express from 'express'
import { paintTypeService } from '~/services/product/properties/paintTypeService'
import { paintTypeValidation } from '~/validations/product/properties/paintTypeValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'

const Router = express.Router()

Router.route('/')
  .get(validatePaginationParams.validateQuery, paintTypeService.getAll)
  .post(paintTypeValidation.createNew, paintTypeService.createNew)
Router.route('/:id')
  // .get(co.getDetails)
  // update product
  .patch(paintTypeValidation.update, paintTypeService.update)
  .delete(paintTypeService.deleteItem)

export const colorRoute = Router
