import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productRoute } from './product/productRoute'
import { departmentRoute } from './department/departmentRoute'
import { userRoute } from './user/userRoute'
import { orderRoute } from '../order/orderRoute'
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
Router.use('/orders', orderRoute)
export const APIs_V1 = Router