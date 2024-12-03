import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productRoute } from './product/productRoutes'
const Router = express.Router()

Router.get('/status', (req,res) => {
    res.status(StatusCodes.OK).json({
        message: 'API V1 are ready to use.',
        code:StatusCodes.OK
    })
})

//Products APi
Router.use("/products",productRoute)

export const APIs_V1 = Router