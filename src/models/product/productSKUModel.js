import { pool } from '~/config/postgresql'
import Joi from 'joi'
import { productModel } from './productModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const PRODUCTION_COLLECTION_SCHEMA = Joi.object({
  productId: Joi.number().required().min(1),
  colorId: Joi.number().required().min(1),
  paintTypeId: Joi.number().required(),
  internalCode: Joi.string().required().max(20).trim()
})

const validateBeforeCreate = async (data) => {
  return await PRODUCTION_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const findOneByField = async (field) => {
  try {
    const getDetailsQuery =
      'SELECT * FROM  productssku WHERE internalcode = $1 '

    const client = await pool.connect()
    const result = await client.query(getDetailsQuery, [field])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const { productId, colorId, paintTypeId, internalCode } = validData

    console.log('🚀 ~ file: productSKUModel.js:46 ~ validData:', validData)
    const product = await productModel.findOneById(productId)

    console.log('🚀 ~ file: productSKUModel.js:49 ~ product:', product)

    if (!product)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product is not exits!')
    const productFindByERPCode = await findOneByField(internalCode)

    console.log(
      '🚀 ~ file: productSKUModel.js:54 ~ productFindByERPCode:',
      productFindByERPCode
    )
    if (productFindByERPCode)
      throw new ApiError(StatusCodes.NOT_FOUND, 'ERP Code is already exits')
    const createNewQuery = `
        INSERT INTO productssku(productid,colorid,painttypeid,internalcode) values($1,$2,$3,$4) RETURNING  *;`
    const client = await pool.connect()

    const result = await client.query(createNewQuery, [
      productId,
      colorId,
      paintTypeId,
      internalCode
    ])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const getDetailsQuery = 'SELECT * FROM products WHERE id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  // const result = await
  try {
    // console.log('🚀 ~ file: productModel.js:43 ~ id:', id)

    const getDetailsQuery = 'SELECT * FROM products WHERE id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}
const getAllProductSKU = async (limitPage, offsetPage) => {
  try {
    const getDetailsQuery =
      'SELECT * FROM  productssku order by id limit = $1 offset = $2'
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [limitPage, offsetPage])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (productSKUId, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName]
    })

    const fieldNames = Object.keys(updateData)
    const fieldValue = Object.values(updateData)

    const updateQuery = `UPDATE productssku SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
    const client = await pool.connect()

    const result = await client.query(updateQuery, [
      productSKUId,
      ...fieldValue
    ])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOneById = async (id) => {
  try {
    const deleteQuery = 'DELETE FROM products WHERE id = $1 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const productSKUModel = {
  createNew,
  findOneById,
  getDetails,
  getAllProductSKU,
  update,
  deleteOneById
}
