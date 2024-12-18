import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { productValidation } from '~/validations/product/productValidation'
import { productController } from '~/controller/product/productController'
import { productSKURoute } from './productSKURoute'
import { validatePaginationParams } from '~/validations/product/validatePaginationParams'

const Router = express.Router()
Router.use('/sku', productSKURoute)

Router.route('/')
  .get(validatePaginationParams.validateQuery, productController.getAllProduct)
  .post(productValidation.createNew, productController.createNew)
Router.route('/:id')
  .get(productController.getDetails)
  // update product
  .patch(productValidation.update, productController.update)
  .delete(productController.deleteItem)


export const productRoute = Router
