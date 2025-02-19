import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { orderModel } from '~/models/order/orderModel'
import { custom } from 'joi'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newOrder = {
      ...reqBody
    }
    const createNewOrder = await orderModel.createNew(newOrder)
    return createNewOrder
  } catch (error) {
    throw error
  }
}

const getDetails = async (order) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const orderDetails = await orderModel.getDetails(order)

    if (!orderDetails)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found!')
    return orderDetails
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await orderModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    const ordersClone = cloneDeep(result)

    const orders = ordersClone.reduce((pre, cur) => {
      const existOrder = pre.filter((el) => el.id === cur.id)
      if (!existOrder.length)
        pre.push({
          id: cur.id,
          userId: cur.usercreatedid,
          userName: cur.username,
          customerId: cur.customerid,
          customerName: cur.customername,
          timeExport: cur.timeexport,
          createdAt: cur.createdat,
          updatedAt: cur.updatedat
        })
      return pre
    }, [])

    return orders
  } catch (error) {
    throw error
  }
}
const update = async (orderId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const order = await orderModel.update(orderId, updateData)
    return order
  } catch (error) {
    throw error
  }
}

const deleteItem = async (orderId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetOrder = await orderModel.findOneById(orderId)
    if (!targetOrder)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await orderModel.deleteOneById(orderId)
    return {
      deleteResult: 'Order and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const orderService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
