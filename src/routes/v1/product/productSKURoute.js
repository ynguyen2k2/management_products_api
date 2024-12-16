import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productSKUController } from '~/controller/product/productSKUController'
import { productSKUValidation } from '~/validations/product/productSKUValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'Note: API get list products SKU'
    })
  })
  .post(productSKUValidation.createNew, productSKUController.createNew)
Router.route('/:id')
//   .get(productController.getDetails)
//   // update product
//   .patch(productValidation.update, productController.update)
//   .delete(productController.deleteItem)

export const productSKURoute = Router
