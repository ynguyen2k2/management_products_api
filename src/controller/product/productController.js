import { StatusCodes } from "http-status-codes";
import productService from "~/services/product/productService";
const createNew = async (req, res, next) => {
    try {
        
        const createProduct = await productService.createNew(req.body)
        res.status(StatusCodes.CREATED).json(createProduct)
    } catch (error) {
        next(error)
    }
}

export default productController = {
    createNew
}