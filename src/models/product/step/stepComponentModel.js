import { pool } from '~/config/postgresql'
import Joi from 'joi'

const STEPCOMPONENT_PRODUCT_COLLECTION_SCHEMA = Joi.object({
  componentid: Joi.number().required(),
  operationid: Joi.number().required(),
  step: Joi.number().min(1).max(100),
  note: Joi.string().min(3).max(100).trim(),
  cycletime: Joi.number().min(1).max(10).required(),
  quantitycycletime: Joi.number().min(1).max(10).required(),
  workerquantity: Joi.number().min(1).max(10).required()
})

const validateBeforeCreate = async (data) => {
  return await STEPCOMPONENT_PRODUCT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    const createNewQuery = `
       INSERT INTO stepcomponent(componentid,operationid,step,note,cycletime,quantitycycletime,workerquantity) 
values($1,$2,$3,$4,$5,$6,$7) RETURNING *;`
    const client = await pool.connect()
    const {
      componentid,
      operationid,
      step,
      note,
      cycletime,
      quantitycycletime,
      workerquantity
    } = validData
    const result = await client.query(createNewQuery, [
      componentid,
      operationid,
      step,
      note,
      cycletime,
      quantitycycletime,
      workerquantity
    ])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const getDetailsQuery = 'SELECT * FROM stepcomponent WHERE id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    // console.log('🚀 ~ file: productModel.js:43 ~ id:', id)
    const getDetailsQuery = 'SELECT * FROM  stepcomponent WHERE id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  try {
    const getDetailsQuery = `SELECT * FROM  stepcomponent order by ${filter} ${sort} limit  $1 offset  $2`
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [limit, offset])
    client.release()
    return result.rows || null
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName]
    })

    const fieldNames = Object.keys(updateData)
    const fieldValue = Object.values(updateData)

    const updateQuery = `UPDATE stepcomponent SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
    const client = await pool.connect()

    const result = await client.query(updateQuery, [id, ...fieldValue])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOneById = async (id) => {
  try {
    const deleteQuery = 'DELETE FROM stepcomponent WHERE id = $1 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const stepComponentModel = {
  createNew,
  findOneById,
  getDetails,
  getAll,
  update,
  deleteOneById
}
