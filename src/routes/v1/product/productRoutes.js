import express from 'express'
import { productValidation } from '~/validations/product/productValidation'
import { productController } from '~/controller/product/productController'
import { productSKURoute } from './productSKURoute'
import { validatePaginationParams } from '~/validations/product/validatePaginationParams'
import { colorRoute } from './properties/colorRoutes'
import { paintTypeRoute } from './properties/paintTypeRoutes'
import { rawMaterialRoute } from './properties/rawMaterialRoutes'

const Router = express.Router()
Router.use('/sku', productSKURoute)
Router.use('/color', colorRoute)
Router.use('/painttype', paintTypeRoute)
Router.use('/rawmaterial', rawMaterialRoute)

Router.route('/')
  .get(validatePaginationParams.validateQuery, productController.getAll)
  .post(productValidation.createNew, productController.createNew)
Router.route('/:id')
  .get(productController.getDetails)
  // update product
  .patch(productValidation.update, productController.update)
  .delete(productController.deleteItem)

export const productRoute = Router
