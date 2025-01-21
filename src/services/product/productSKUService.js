import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { productSKUModel } from '~/models/product/productSKUModel'
import ApiError from '~/utils/ApiError'
// import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newProductSKU = {
      ...reqBody
    }
    // console.log("🚀 ~ file: productService.js:10 ~ newProduct:", newProduct)

    const createProductSKU = await productSKUModel.createNew(newProductSKU)
    return createProductSKU
  } catch (error) {
    throw error
  }
}

const getDetails = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await productSKUModel.getDetails(productId)
    const productSKUClone = cloneDeep(result)
    const productSKU = productSKUClone.reduce((pre, cur) => {
      console.log('🚀 ~ file: productSKUService.js:29 ~ cur:', cur)
      const existProductSKU = pre.filter((el) => el.id === cur.id)
      if (!existProductSKU.length) {
        pre.push({
          id: cur.id,
          name: cur.name,
          internalCode: cur.internalcode,
          colorId: cur.colorid,
          color: cur.color,
          paintTypeId: cur.painttypeid,
          paintType: cur.painttype,
          components: [
            {
              id: cur.componentid,
              name: cur.componentname,
              colorId: cur.colorcomponentid,
              color: cur.colorcomponent,
              rawMaterialId: cur.rawmaterialid,
              rawMaterial: cur.rawmaterial
            }
          ],
          createdAt: cur.createdat,
          updatedAtL: cur.updatedat
        })
      } else {
        {
          const component = {
            id: cur.componentid,
            name: cur.componentname,
            colorId: cur.colorcomponentid,
            color: cur.colorcomponent,
            rawMaterialId: cur.rawmaterialid,
            rawMaterial: cur.rawmaterial
          }
          pre.forEach((el) => {
            if (el.id === cur.id) el.components.push(component)
          })
        }
      }

      return pre
    }, [])

    if (!productSKU)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found!')
    return productSKU
  } catch (error) {
    throw error
  }
}

const getAll = async ({ limit, offset, sort, filter }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const products = await productSKUModel.getAll({
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

const update = async (productskuId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedat: new Date(Date().toLocaleString('vi-VN', {})).toISOString()
    }
    const product = await productSKUModel.update(productskuId, updateData)
    return product
  } catch (error) {
    throw error
  }
}

const deleteItem = async (productId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const targetProductSKU = await productSKUModel.findOneById(productId)
    if (!targetProductSKU)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product Not Found!')
    await productSKUModel.deleteOneById(productId)
    return {
      deleteResult: 'ProductSKU and all its properties are deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export const productSKUService = {
  createNew,
  getDetails,
  getAll,
  update,
  deleteItem
}
