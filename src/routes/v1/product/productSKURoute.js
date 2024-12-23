import express from 'express'
import { productSKUController } from '~/controller/product/productSKUController'
import { productSKUValidation } from '~/validations/product/productSKUValidation'
import { validatePaginationParams } from '~/validations/product/validatePaginationParams'
import { componentRoute } from './component/componentRoutes'

const Router = express.Router()
Router.use('/:skuId/components', componentRoute)

Router.route('/')
  .get(validatePaginationParams.validateQuery, productSKUController.getAll)
  .post(productSKUValidation.createNew, productSKUController.createNew)
Router.route('/:id')
  .get(productSKUController.getDetails)
  // update product
  .patch(productSKUValidation.update, productSKUController.update)
  .delete(productSKUController.deleteItem)
export const productSKURoute = Router
