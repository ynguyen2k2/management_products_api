import { pool } from '~/config/postgresql'
import Joi from 'joi'

const COMPOENENT_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is not allowed to be empty',
    'string.min': 'Name length must be at least 3 characters long',
    'string.max':
      'Name length must be less than or equal to 50 characters long',
    'string.trim': 'Name must not have leading or trailing whitespaces'
  }),
  productId: Joi.number().required().min(1),
  colorId: Joi.number().required().min(1),
  rawMaterialId: Joi.number().required().min(1),
  quantity: Joi.number().required().min(1),
  dimension: Joi.string().min(1).max(50)
})

const validateBeforeCreate = async (data) => {
  return await COMPOENENT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const createNew = async (productSkuId, data) => {
  try {
    const validData = await validateBeforeCreate(data)

    console.log('🚀 ~ file: productModel.js:23 ~ validData:', validData)

    const createNewQuery = `
        INSERT INTO components(name,productid,colorId,rawMaterialId,quantity,dimension) values($1,$2,$3,$4,$5,$6) RETURNING  *;`
    const client = await pool.connect()
    const { name, productId, colorId, rawMaterialId, quantity, dimension } =
      validData
    const result = await client.query(createNewQuery, [
      name,
      productId,
      colorId,
      rawMaterialId,
      quantity,
      dimension
    ])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id, productSkuId) => {
  try {
    const getDetailsQuery =
      'SELECT * FROM components WHERE id = $1 and productid = $2'
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id, productSkuId])

    client.release()
    return result.rows[0] || null
  } catch (error) { 
    throw new Error(error)
  }
}

const getDetails = async (id, productSkuId) => {
  try {
    const getDetailsQuery =
      'SELECT * FROM  components WHERE id = $1 and productid = $2 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id, productSkuId])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async ({ limit, offset, sort, filter, productSkuId }) => {
  try {
    const values = [limit, offset, productSkuId]

    const getDetailsQuery = `SELECT * FROM  components  where productid = $3 order by ${filter} ${sort}  limit  $1 offset $2`
    const client = await pool.connect()
    const result = await client.query(getDetailsQuery, values)

    client.release()
    return result.rows || null
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, productSkuId, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName]
    })

    const fieldNames = Object.keys(updateData)
    const fieldValue = Object.values(updateData)

    const updateQuery = `UPDATE components SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 3)).join(', ')}) WHERE id = $1 and productid = $2 RETURNING * ;`
    const client = await pool.connect()

    const result = await client.query(updateQuery, [
      id,
      productSkuId,
      ...fieldValue
    ])
    client.release()

    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOneById = async (id, productSkuId) => {
  try {
    const deleteQuery =
      'DELETE FROM components WHERE id = $1 and productid = $2 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id, productSkuId])

    console.log('🚀 ~ file: componentModel.js:131 ~ result:', result)
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

export const componentModel = {
  createNew,
  findOneById,
  getDetails,
  getAll,
  update,
  deleteOneById
}
