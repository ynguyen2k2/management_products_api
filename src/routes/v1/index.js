import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()

Router.get('/status', (req,res) => {
    res.status(StatusCodes.Ok).json({
        message: 'API V1 are ready to use.',
        code:StatusCodes.Ok
    })
})

export const APIs_V1 = Router