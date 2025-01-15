import { pool } from '~/config/postgresql'
import Joi from 'joi'

const QUANTITY_COMPOENENT_COLLECTION_SCHEMA = Joi.object({
  componentId: Joi.number().required().min(1),
  productId: Joi.number().required().min(1),
  orderItemId: Joi.number().required().min(1),
  departmentId: Joi.number().required().min(1),
  machineid: Joi.number().min(1),
  operationId: Joi.number().min(1),
  quantity: Joi.number().required().min(1),
  userimportId: Joi.number().required().min(1)
})

const validateBeforeCreate = async (data) => {
  return await QUANTITY_COMPOENENT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const createNew = async (productSkuId, data) => {
  try {
    const validData = await validateBeforeCreate(data)

    console.log('🚀 ~ file: productModel.js:23 ~ validData:', validData)

    const createNewQuery = `
        INSERT INTO quantitycomponent(componentId,productid,orderItemId,departmentId,machineid,operationId,quantity, userimportId) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING  *;`
    const client = await pool.connect()
    const {
      componentId,
      productId,
      orderItemId,
      departmentId,
      machineId,
      operationId,
      quantity,
      userimportId
    } = validData
    const result = await client.query(createNewQuery, [
      componentId,
      productId,
      orderItemId,
      departmentId,
      machineId,
      operationId,
      quantity,
      userimportId
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
      'SELECT * FROM quantitycomponent WHERE id = $1 and productid = $2'
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
      'SELECT * FROM  quantitycomponent WHERE id = $1 and productid = $2 '
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

    const getDetailsQuery = `SELECT * FROM  quantitycomponent  where productid = $3 order by ${filter} ${sort}  limit  $1 offset $2`
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

    const updateQuery = `UPDATE quantitycomponent SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 3)).join(', ')}) WHERE id = $1 and productid = $2 RETURNING * ;`
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
      'DELETE FROM quantitycomponent WHERE id = $1 and productid = $2 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id, productSkuId])

    console.log('🚀 ~ file: componentModel.js:131 ~ result:', result)
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

export const quantityComponentModel = {
  createNew,
  findOneById,
  getDetails,
  getAll,
  update,
  deleteOneById
}
