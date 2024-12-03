import Joi from "joi"
import { StatusCodes } from "http-status-codes"
import ApiError from "~/utils/ApiError"

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



const createNew = async(req , res, next) => {
    const conrectCondition = Joi.object({
        name: Joi.string().min(3).max(100).trim().strict().messages({
            'any.required': 'Name is required',
            'string.empty': 'Name is not allowed to be empty',
            'string.min': 'Name length must be at least 3 characters long',
            'string.max': 'Name length must be less than or equal to 50 characters long',
            'string.trim': 'Name must not have leading or trailing whitespaces'
        }),
        description: Joi.string().min(3).max(100).trim().strict(),
        cover:Joi.string().min(3).trim(),
    })   
    try {
        
        await conrectCondition.validateAsync(req.body, {abortEarly: false})

        // console.log("🚀 ~ file: productValidation.js:36 ~ req.body:", req.body)
        next()
    } catch (error) {



        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    } 

}

export const productValidation = {
    createNew
}