import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { orderItemModel } from '~/models/order/orderItemModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newOrderItem = {
      ...reqBody
    }
    const createOrderItem = await orderItemModel.createNew(newOrderItem)
    return createOrderItem
  } catch (error) {
    throw error
  }
}

const getDetails = async (order) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const orderItemDetails = await orderItemModel.getDetails(order)

    if (!orderItemDetails)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found!')
    return orderItemDetails
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const orderItems = await orderItemModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return orderItems
  } catch (error) {
    throw error
  }
}
const update = async (orderItemId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const orderItem = await orderItemModel.update(orderItemId, updateData)
    return orderItem
  } catch (error) {
    throw error
  }
}

const deleteItem = async (orderItemId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetOrderItem = await orderItemModel.findOneById(orderItemId)
    if (!targetOrderItem)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await orderItemModel.deleteOneById(orderItemId)
    return {
      deleteResult: 'Order and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const orderItemService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
