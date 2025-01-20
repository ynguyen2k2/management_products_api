import { pool } from '~/config/postgresql'
import Joi from 'joi'

const DEPARTMENT_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict()
})

const validateBeforeCreate = async (data) => {
  return await DEPARTMENT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    const createNewQuery = `
        INSERT INTO departments(name) values($1) RETURNING  *;`
    const client = await pool.connect()
    const { name } = validData
    const result = await client.query(createNewQuery, [name])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const getDetailsQuery = 'SELECT * FROM departments WHERE id = $1 '
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
      'SELECT m.name as machinename, m.id as machineId, d.name as departmentName,d.id as departmentId , o.name as operationname, o.id as operationId , d.createdat, d.updatedat FROM  departments as d INNER JOIN (machines as m INNER JOIN operations as o ON o.machineid = m.id) on m.departmentid = d.id  WHERE d.id = $1 order by m.id asc '
    const client = await pool.connect()
    const result = await client.query(getDetailsQuery, [id])
    // console.log(result.rows)
    client.release()
    return result.rows || null
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  try {
    const getDetailsQuery = `SELECT departments.id,departments.name,departments.createdat,departments.updatedat FROM  departments order by ${filter} ${sort} limit  $1 offset  $2`
    //limit  $1 offset  $2
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

    const updateQuery = `UPDATE departments SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
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
    const deleteQuery = 'DELETE FROM departments WHERE id = $1 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const departmentModel = {
  createNew,
  findOneById,
  getDetails,
  getAll,
  update,
  deleteOneById
}
