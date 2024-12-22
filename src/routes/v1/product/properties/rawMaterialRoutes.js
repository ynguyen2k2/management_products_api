import express from 'express'
import { rawMaterialController } from '~/controller/product/properties/rawMaterialController'
import { rawMaterialValidation } from '~/validations/product/properties/rawMaterialValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'

const Router = express.Router()

Router.route('/')
  .get(validatePaginationParams.validateQuery, rawMaterialController.getAll)
  .post(rawMaterialValidation.createNew, rawMaterialController.createNew)
Router.route('/:id')
  .get(rawMaterialController.getDetails)
  // update product
  .patch(rawMaterialValidation.update, rawMaterialController.update)
  .delete(rawMaterialController.deleteItem)

export const rawMaterialRoute = Router
