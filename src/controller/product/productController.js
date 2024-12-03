import { StatusCodes } from "http-status-codes";
import {productService} from "~/services/product/productService";
const createNew = async (req, res, next) => {
    try {
        const createProduct = await productService.createNew(req.body)

        // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
        res.status(StatusCodes.CREATED).json(createProduct)
    } catch (error) {
        next(error)
    }
}

const getDetails = async(req,res,next) => {
    try {
        const productId = req.param.id
        const product = await productService.getDetails(productId)
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        next(error)
    }
}

export const productController = {
    createNew,
    getDetails
}