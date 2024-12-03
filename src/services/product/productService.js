
import { slugify } from "~/utils/formatter"
import { productModel } from "~/models/product/productModel"
import ApiError from "~/utils/ApiError"
import { StatusCodes } from "http-status-codes"


const createNew = async(reqBody) => {
    try {
        const newProduct = {

            ...reqBody,
            slug: slugify(reqBody.name)
        }
        // console.log("🚀 ~ file: productService.js:10 ~ newProduct:", newProduct)
        
        const createProduct = await productModel.createNew(newProduct)

        return createProduct
    } catch (error) {
        throw error
    }
}

const getDetails = async(productId) => {
    try {
        const product = await productModel.getDetails(productId)
        if(!product) 
            throw new ApiError(StatusCodes.NOT_FOUND,"Product not found!")
        return proudct
    } catch (error) {
        throw(error)
    }
}

export const productService = {
    createNew,
    getDetails
}