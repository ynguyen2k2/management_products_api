import { StatusCodes } from 'http-status-codes'
import { orderItemService } from '~/services/order/orderItemService'

const createNew = async (req, res, next) => {
  try {
    const createOrderItem = await orderItemService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createOrderItem)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const orderItemId = req.params.id

    const orderItem = await orderItemService.getDetails(orderItemId)
    res.status(StatusCodes.OK).json(orderItem)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const sort = req.query.sort || 'asc'
    const filter = req.query.filter || 'id'
    const offset = (page - 1) * limit

    const orderItems = await orderItemService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(orderItems)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const orderItemId = req.params.id
    const orderItem = await orderItemService.update(orderItemId, req.body)
    res.status(StatusCodes.OK).json(orderItem)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const orderItemId = req.params.id
    const result = await orderItemService.deleteItem(orderItemId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const orderItemController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
