import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { productValidation } from '~/validations/product/productValidation'
import { productController } from '~/controller/product/productController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'Note: API get list products'
    })
  })
  .post(productValidation.createNew, productController.createNew)
Router.route('/:id')
  .get(productController.getDetails)
  // update product
  .patch(productValidation.update, productController.update)
  .delete(productController.deleteItem)

export const productRoute = Router
