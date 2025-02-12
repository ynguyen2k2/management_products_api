import { pool } from '~/config/postgresql'
import Joi from 'joi'

const USER_COLLECTION_SCHEMA = Joi.object({
  firstName: Joi.string().required().min(3).max(100).trim().strict(),
  lastName: Joi.string().required().min(3).max(100).trim().strict(),
  userName: Joi.string().required().min(3).max(100).trim().strict(),
  email: Joi.string().email().required().trim().strict(),
  role: Joi.string().required().min(3).max(100).trim().strict().default('user'),
  avatar: Joi.string().uri().trim().strict(),
  password: Joi.string().min(8).trim(),
  passwordChangedAt: Joi.date().iso().default(Date.now()),
  passwordResetToken: Joi.string().trim().default(null),
  passwordResetExpires: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'password', 'createdAt']

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    console.log('🚀 ~ validData:', validData)
    const createNewQuery = `
        INSERT INTO users(firstName,lastName,userName,email,role,avatar,password,passwordChangedAt) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING  *;`
    const client = await pool.connect()
    const {
      firstName,
      lastName,
      userName,
      email,
      role,
      avatar,
      password,
      passwordChangedAt
    } = validData

    const result = await client.query(createNewQuery, [
      firstName,
      lastName,
      userName,
      email,
      role,
      avatar,
      password,
      passwordChangedAt
    ])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const getDetailsQuery = 'SELECT users.id FROM users WHERE id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}
const findOneByEmail = async (field) => {
  try {
    const query = 'SELECT * from USERS WHERE email = $1 '
    const client = await pool.connect()
    const result = await client.query(query, [field])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneByToken = async (resetToken) => {
  try {
    const query = `SELECT users.id from USERS 
    WHERE passwordresettoken = $1  and passwordresetexpires > now()`
    const client = await pool.connect()
    const result = await client.query(query, [resetToken])
    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    // console.log('🚀 ~ file: productModel.js:43 ~ id:', id)
    const getDetailsQuery = 'SELECT * FROM  users WHERE id = $1 '
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
    const getDetailsQuery = `SELECT * FROM  users order by ${filter} ${sort} limit  $1 offset  $2`
    const client = await pool.connect()
    const result = await client.query(getDetailsQuery, [limit, offset])
    client.release()
    return result.rows || null
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (userId, updateData) => {
  try {
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName]
    })

    const fieldNames = Object.keys(updateData)
    const fieldValue = Object.values(updateData)

    const updateQuery = `UPDATE users SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
    const client = await pool.connect()

    const result = await client.query(updateQuery, [userId, ...fieldValue])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

const updateAuth = async (userId, updateData) => {
  try {
    const fieldNames = Object.keys(updateData)
    const fieldValue = Object.values(updateData)

    const updateQuery = `UPDATE users SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
    const client = await pool.connect()

    const result = await client.query(updateQuery, [userId, ...fieldValue])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOneById = async (id) => {
  try {
    const deleteQuery = 'DELETE FROM users WHERE id = $1 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  createNew,
  findOneByEmail,
  findOneById,
  findOneByToken,
  getDetails,
  getAll,
  update,
  updateAuth,
  deleteOneById
}
