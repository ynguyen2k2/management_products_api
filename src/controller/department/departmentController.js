import { StatusCodes } from 'http-status-codes'
import { departmentService } from '~/services/department/departmentService'

const createNew = async (req, res, next) => {
  try {
    const createDepartment = await departmentService.createNew(req.body)

    // console.log("🚀 ~ file: productController.js:7 ~ req.body:", req.body)
    res.status(StatusCodes.CREATED).json(createDepartment)
  } catch (error) {
    next(error)
  }
}
// get all productSKU of product
const getDetails = async (req, res, next) => {
  try {
    const departmentId = req.params.id

    const department = await departmentService.getDetails(departmentId)
    res.status(StatusCodes.OK).json(department)
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

    const departments = await departmentService.getAll({
      limit,
      offset,
      sort,
      filter
    })
    res.status(StatusCodes.OK).json(departments)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const departmentId = req.params.id
    const department = await departmentService.update(departmentId, req.body)
    res.status(StatusCodes.OK).json(department)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const departmentId = req.params.id
    const result = await departmentService.deleteItem(departmentId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const departmentController = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
