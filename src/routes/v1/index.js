import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productRoute } from './product/productRoute'
import { departmentRoute } from './department/departmentRoute'
import { userRoute } from './user/userRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'API V1 are ready to use.',
    code: StatusCodes.OK
  })
})

//Products APi
Router.use('/products', productRoute)
Router.use('/departments', departmentRoute)
Router.use('/users', userRoute)

export const APIs_V1 = Router