import { StatusCodes } from 'http-status-codes'
import { componentService } from '~/services/product/component/componentService'
const createNew = async (req, res, next) => {
  try {
    const createComponent = await componentService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createComponent)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const componentId = req.params.id

    const component = await componentService.getDetails(componentId)
    res.status(StatusCodes.OK).json(component)
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

    console.log('🚀 ~ file: componentController.js:35 ~ id:', req.params.skuId)

    const components = await componentService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(components)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const componentId = req.params.id
    const component = await componentService.update(componentId, req.body)
    res.status(StatusCodes.OK).json(component)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const componentId = req.params.id
    const result = await componentService.deleteItem(componentId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const componentController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
