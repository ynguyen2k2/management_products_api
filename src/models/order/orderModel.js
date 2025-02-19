import { pool } from '~/config/postgresql'
import Joi from 'joi'

const ORDER_COLLECTION_SCHEMA = Joi.object({
  userCreatedId: Joi.number().required().min(1).max(100).strict(),
  customerId: Joi.number().required().min(1).max(100).strict(),
  timeExport: Joi.date().required().iso()
})

const validateBeforeCreate = async (data) => {
  return await ORDER_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createNewQuery = `
        INSERT INTO orderdetails(userCreatedId,customerId,timeExport) values($1,$2,$3) RETURNING  *;`
    const client = await pool.connect()
    const { userCreatedId, customerId, timeExport } = validData
    const result = await client.query(createNewQuery, [
      userCreatedId,
      customerId,
      timeExport
    ])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const getDetailsQuery = 'SELECT * FROM orderdetails WHERE id = $1 '
    const client = await pool.connect()

    const result = await client.query(getDetailsQuery, [id])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}
// uncomplete
const getDetails = async (id) => {
  try {
    // console.log('🚀 ~ file: productModel.js:43 ~ id:', id)
    const getDetailsQuery =
      `
    select od.id as id ,od.usercreatedid,u.username,od.customerid,uc.username, 
    od.timeexport, od.createdat, od.updatedat  from orderdetails as od
    INNER JOIN users as u on u.id =  od.usercreatedid
    INNER JOIN users as uc on uc.id =  od.customerid;
      `
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

    const getDetailsQuery = `
     select od.id as id ,od.usercreatedid,u.username,od.customerid,uc.username as customername, 
    od.timeexport, od.createdat, od.updatedat  from orderdetails as od
    INNER JOIN users as u on u.id =  od.usercreatedid
    INNER JOIN users as uc on uc.id =  od.customerid;
 `
    const client = await pool.connect()
    const result = await client.query(getDetailsQuery)

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

    const updateQuery = `UPDATE orderdetails SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
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
    const deleteQuery = 'DELETE FROM orderdetails WHERE id = $1 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const orderModel = {
  createNew,
  findOneById,
  getDetails,
  getAll,
  update,
  deleteOneById
}
