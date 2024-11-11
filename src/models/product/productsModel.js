import { pool } from "~/config/postgresql";
import Joi from "joi"
import productQueries from "~/db/table/product/productQueries";


const PRODUCTION_COLLECTION_SCHEMA = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().default("Description of product").min(3).max(50).trim().strict(),
    cover:Joi.string().min(3).trim(),
    slug: Joi.string().required().min(3).trim().strict(),
})


const validateBeforeCreate = async (data) => {
    return await PRODUCTION_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false
    })
  }

const createNew = async (data) => { 
    try {
        const validData  = await validateBeforeCreate(data)
        const client = await pool.connect()
        const {name, description, cover, slug} = data
        const result = await client.query(productQueries.createNewQuery,[name, description, cover,slug])
    } catch (error) {
        throw new Error(error)
    }
    
}

export default productModel = { createNew } 