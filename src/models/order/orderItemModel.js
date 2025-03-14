import { pool } from '~/config/postgresql'
import Joi from 'joi'

const ORDER_ITEM_COLLECTION_SCHEMA = Joi.object({
  orderDetailId: Joi.number().required().min(1).max(100).strict(),
  productId: Joi.number().required().min(1).max(100).strict(),
  quantity: Joi.number().required().min(1).max(100).strict(),
  price: Joi.number().required().min(1).max(100).strict()
})

const validateBeforeCreate = async (data) => {
  return await ORDER_ITEM_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const INVALID_UPDATE_FIELDS = ['id', 'createdAt']

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createNewQuery = `
        INSERT INTO orderitems(orderDetailId,productId,quantity,price) values($1,$2,$3,$4) RETURNING  *;`
    const client = await pool.connect()
    const { orderDetailId, productId, quantity, price } = validData
    const result = await client.query(createNewQuery, [
      orderDetailId,
      productId,
      quantity,
      price
    ])

    client.release()
    return result.rows[0] || null
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const getDetailsQuery = 'SELECT * FROM orderitems WHERE id = $1 '
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
    const getDetailsQuery = ''
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
    select oi.id, oi.orderdetailid, oi.productid as skuId,p.name as productname, ps.colorid as colorId, 
    cl.value as colorProduct, ps.painttypeid as painttypeid,pt.value as painttype,oi.
    createdat, oi.updatedat from orderitems as oi
    INNER JOIN ( productssku as ps 
    INNER JOIN colorproduct AS cl on cl.id = ps.colorid
    INNER JOIN painttype as pt on pt.id = ps.painttypeid
    INNER JOIN products as p on p.id = ps.productid
    INNER JOIN (components as cm 
    INNER JOIN colorproduct as clc on clc.id = cm.colorid
    INNER JOIN rawmaterial as rm on rm.id = cm.rawmaterialid) on cm.productid = ps.id) 
    on ps.id = oi.productid; 
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

    const updateQuery = `UPDATE orderitems SET (${fieldNames.join(',')}) = (${fieldNames.map((_, i) => '$' + (i + 2)).join(', ')}) WHERE id = $1 RETURNING * ;`
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
    const deleteQuery = 'DELETE FROM orderitems WHERE id = $1 RETURNING *'
    const client = await pool.connect()
    const result = await client.query(deleteQuery, [id])
    client.release()
    return result.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

export const orderItemModel = {
  createNew,
  findOneById,
  getDetails,
  getAll,
  update,
  deleteOneById
}
