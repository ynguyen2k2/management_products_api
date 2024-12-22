import { pool } from '~/config/postgresql'
import Joi from 'joi'

const COLOR_PRODUCT_COLLECTION_SCHEMA = Joi.object({
  value: Joi.string().required().min(3).max(100).trim().strict(),
  colorCode: Joi.string().min(3).trim()
})

const validateBeforeCreate = async (data) => {
  return await COLOR_PRODUCT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    console.log('🚀 ~ file: productModel.js:23 ~ validData:', validData)

    const createNewQuery = `
        INSERT INTO colorproduct(vallue,colorcode) values($1,$2) RETURNING  *;`
    const client = await pool.connect()
    const { value, colorCode } = validData
    const result = await client.query(createNewQuery, [value, colorCode])

    console.log('🚀 ~ file: productModel.js:31 ~ result:', result)

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const getDetailsQuery = 'SELECT * FROM colorproduct WHERE id = $1 '
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
    const getDetailsQuery = 'SELECT * FROM  colorproduct WHERE id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async (limitNumber, offsetPage) => {
  try {
    const getDetailsQuery =
      'SELECT * FROM  colorproduct order by id limit = $1 offset = $2'
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [
      limitNumber,
      offsetPage
    ])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (colorId, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName]
    })

    const fieldNames = Object.keys(updateData)
    const fieldValue = Object.values(updateData)

    const updateQuery = `UPDATE colorproduct SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
    const client = await pool.connect()

    const result = await client.query(updateQuery, [colorId, ...fieldValue])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOneById = async (id) => {
  try {
    const deleteQuery = 'DELETE FROM colorproduct WHERE id = $1 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const colorModel = {
  createNew,
  findOneById,
  getDetails,
  getAll,
  update,
  deleteOneById
}
