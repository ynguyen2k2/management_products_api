import { StatusCodes } from 'http-status-codes'
import { quantityComponentService } from '~/services/product/component/quantityComponentService'
const createNew = async (req, res, next) => {
  try {
    const productSkuId = req.params.skuId
    const createQuantityComponent = await quantityComponentService.createNew(
      productSkuId,
      req.body
    )

    res.status(StatusCodes.CREATED).json(createQuantityComponent)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const quantityComponentId = req.params.id
    const productSkuId = req.params.skuId
    const quantityComponent = await quantityComponentService.getDetails(
      quantityComponentId,
      productSkuId
    )
    res.status(StatusCodes.OK).json(quantityComponent)
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

    const productSkuId = req.params.skuId

    const quantityComponents = await quantityComponentService.getAll({
      limit,
      offset,
      sort,
      filter,
      productSkuId
    })
    res.status(StatusCodes.OK).json(quantityComponents)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const quantityComponentId = req.params.id
    const productSkuId = req.params.skuId

    const quantityComponent = await quantityComponentService.update(
      quantityComponentId,
      productSkuId,
      req.body
    )
    res.status(StatusCodes.OK).json(quantityComponent)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const quantityComponentId = req.params.id
    const productSkuId = req.params.skuId

    const result = await quantityComponentService.deleteItem(
      quantityComponentId,
      productSkuId
    )
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const quantityComponentController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
