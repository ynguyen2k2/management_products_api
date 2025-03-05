import { StatusCodes } from 'http-status-codes'
import { orderService } from '~/services/order/orderService'

const createNew = async (req, res, next) => {
  try {
    const createOrder = await orderService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createOrder)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const orderId = req.params.id

    const order = await orderService.getDetails(orderId)
    res.status(StatusCodes.OK).json(order)
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
    const user = req.user

    console.log('🚀 ~ orderController.js:35 ~ user:', user)
    
    const orders = await orderService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(orders)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const orderId = req.params.id
    const order = await orderService.update(orderId, req.body)
    res.status(StatusCodes.OK).json(order)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const orderId = req.params.id
    const result = await orderService.deleteItem(orderId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const orderController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
