import express from 'express'
import { orderController } from '~/controller/order/orderController'
import { orderValidation } from '~/validations/order/orderValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'
import { orderItemRoute } from './orderItemRoute'

const Router = express.Router()

Router.use('/items', orderItemRoute)
Router.route('/')
  .get(validatePaginationParams.validateQuery, orderController.getAll)
  .post(orderValidation.createNew, orderController.createNew)
Router.route('/:id')
  .get(orderController.getDetails)
  // update product
  .patch(orderValidation.update, orderController.update)
  .delete(orderController.deleteItem)

export const orderRoute = Router
