import express from 'express'
import { stepComponentController } from '~/controller/product/step/stepComponentController'
import { stepComponentValidation } from '~/validations/product/step/stepComponentValidation'

import { validatePaginationParams } from '~/validations/product/validatePaginationParams'
import { validateStepComponentParams } from '~/validations/product/validateStepComponentParams'

const Router = express.Router()

Router.route('/')
  .get(
    validateStepComponentParams.validateQuery,
    stepComponentController.getAll
  )
  .post(stepComponentValidation.createNew, stepComponentController.createNew)
Router.route('/:id')
  .get(stepComponentController.getDetails)
  // update product
  .patch(stepComponentValidation.update, stepComponentController.update)
  .delete(stepComponentController.deleteItem)

export const stepComponentRoute = Router
