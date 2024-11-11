import productModel from "~/models/products/productModel"
import { slugify } from "~/utils/formatter"


const createNew = async(reqBody) => {
    try {
        const newProduct = {
            ...reqBody,
            slug: slugify(reqBody.name)
        }

        const createProduct = await productModel.createNew(newProduct)

        return
    } catch (error) {
        throw error
    }
}

export default productService = {
    createNew
}