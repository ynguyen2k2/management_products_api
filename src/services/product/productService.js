import { slugify } from '~/utils/formatter'
import { productModel } from '~/models/product/productModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newProduct = {
      ...reqBody,
      slug: slugify(reqBody.name)
    }
    // console.log("🚀 ~ file: productService.js:10 ~ newProduct:", newProduct)

    const createProduct = await productModel.createNew(newProduct)
    return createProduct
  } catch (error) {
    throw error
  }
}

const getDetails = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await productModel.getDetails(productId)
    const productClone = cloneDeep(result)
    const product = productClone.reduce((pre, cur) => {
      const existProduct = pre.filter((el) => el.id === cur.id)
      if (!existProduct.length) {
        pre.push({
          id: cur.id,
          name: cur.name,
          description: cur.description,
          cover: cur.cover,
          slug: cur.slug,
          skus: [
            {
              id: cur.skuid,
              internalCode: cur.internalcode,
              colorId: cur.colorid,
              colorName: cur.color,
              paintTypeId: cur.painttypeid,
              paintType: cur.painttype
            }
          ],
          createdAt: cur.createdat,
          updatedAtL: cur.updatedat
        })
      } else {
        {
          const sku = {
            id: cur.skuid,
            internalCode: cur.internalcode,
            colorId: cur.colorid,
            colorName: cur.color,
            paintTypeId: cur.painttypeid,
            paintType: cur.painttype
          }
          pre.forEach((el) => {
            if (el.id === cur.id) el.skus.push(sku)
          })
        }
      }

      return pre
    }, [])

    if (!product)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!')
    return product
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const products = await productModel.getAll({
      limit,
      offset,
      sort,
      filter
    })
    return products
  } catch (error) {
    throw error
  }
}
const update = async (productId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const product = await productModel.update(productId, updateData)
    return product
  } catch (error) {
    throw error
  }
}

const deleteItem = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetProduct = await productModel.findOneById(productId)
    if (!targetProduct)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await productModel.deleteOneById(productId)
    return {
      deleteResult: 'Product and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const productService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
