import { pool } from '~/config/postgresql'
import Joi from 'joi'

const PRODUCTION_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is not allowed to be empty',
    'string.min': 'Name length must be at least 3 characters long',
    'string.max':
      'Name length must be less than or equal to 50 characters long',
    'string.trim': 'Name must not have leading or trailing whitespaces'
  }),
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

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
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
  try {
    // console.log('🚀 ~ file: productModel.js:43 ~ id:', id)
    const getDetailsQuery =
      'select p.id as id ,p.name as name, ps.id as skuid ,ps.colorid as colorId, cl.value as color, \
      ps.painttypeid as painttypeId, pt.value as painttype , ps.internalcode , p.description as description,\
      p.cover as cover, p.slug as slug,p.createdat as createdat, p.updatedat as updatedat from products as p \
      inner join (productssku as ps INNER JOIN colorproduct AS cl on cl.id = ps.colorid \
      INNER JOIN painttype as pt on pt.id = ps.painttypeid)on ps.productid = p.id where p.id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])

    client.release()
    return result.rows || null
  } catch (error) {
    throw new Error(error)
  }

}

const getAll = async ({ limit, offset, sort, filter }) => {
  try {
    const values = [limit, offset]

    const getDetailsQuery = `SELECT * FROM  products order by ${filter} ${sort} limit  $1 offset  $2`
    const client = await pool.connect()
    const result = await client.query(getDetailsQuery, values)

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

    const updateQuery = `UPDATE products SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
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
    const deleteQuery = 'DELETE FROM products WHERE id = $1 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const productModel = {
  createNew,
  findOneById,
  getDetails,
  getAll,
  update,
  deleteOneById
}
