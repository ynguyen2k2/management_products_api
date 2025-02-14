import express from 'express'
import { orderItemController } from '~/controller/order/orderItemController'
import { orderItemValidation } from '~/validations/order/orderItemValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'

const Router = express.Router()

Router.route('/')
  .get(validatePaginationParams.validateQuery, orderItemController.getAll)
  .post(orderItemValidation.createNew, orderItemController.createNew)
Router.route('/:id')
  .get(orderItemController.getDetails)
  // update product
  .patch(orderItemValidation.update, orderItemController.update)
  .delete(orderItemController.deleteItem)

export const orderItemRoute = Router
