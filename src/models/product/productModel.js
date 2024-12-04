import { pool } from '~/config/postgresql'
import Joi from 'joi'

const PRODUCTION_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict(),
  description: Joi.string()
    .default('Description of product')
    .min(3)
    .max(100)
    .trim()
    .strict(),
  cover: Joi.string().min(3).trim(),
  slug: Joi.string().required().min(3).trim().strict()
})

const validateBeforeCreate = async (data) => {
  return await PRODUCTION_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    console.log('🚀 ~ file: productModel.js:23 ~ validData:', validData)

    const createNewQuery = `
        INSERT INTO products(name,description,cover,slug) values($1,$2,$3,$4) RETURNING  *;`
    const client = await pool.connect()
    const { name, description, cover, slug } = validData
    const result = await client.query(createNewQuery, [
      name,
      description,
      cover,
      slug
    ])

    console.log('🚀 ~ file: productModel.js:31 ~ result:', result)

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  // const result = await
  try {
    console.log('🚀 ~ file: productModel.js:43 ~ id:', id)

    const getDetailsQuery = 'SELECT * FROM  products WHERE id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

export const productModel = {
  createNew,
  getDetails
}
