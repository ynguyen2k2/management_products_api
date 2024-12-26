import { StatusCodes } from 'http-status-codes'
import { quatityComponentService } from '~/services/product/component/quatityComponentService'
const createNew = async (req, res, next) => {
  try {
    const productSkuId = req.params.skuId
    const createQuatityComponent = await quatityComponentService.createNew(
      productSkuId,
      req.body
    )

    res.status(StatusCodes.CREATED).json(createQuatityComponent)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const quatityComponentId = req.params.id
    const productSkuId = req.params.skuId
    const quatityComponent = await quatityComponentService.getDetails(
      quatityComponentId,
      productSkuId
    )
    res.status(StatusCodes.OK).json(quatityComponent)
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

    const quatityComponents = await quatityComponentService.getAll({
      limit,
      offset,
      sort,
      filter,
      productSkuId
    })
    res.status(StatusCodes.OK).json(quatityComponents)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const quatityComponentId = req.params.id
    const productSkuId = req.params.skuId

    const quatityComponent = await quatityComponentService.update(
      quatityComponentId,
      productSkuId,
      req.body
    )
    res.status(StatusCodes.OK).json(quatityComponent)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const quatityComponentId = req.params.id
    const productSkuId = req.params.skuId

    const result = await quatityComponentService.deleteItem(
      quatityComponentId,
      productSkuId
    )
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const quatityComponentController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
