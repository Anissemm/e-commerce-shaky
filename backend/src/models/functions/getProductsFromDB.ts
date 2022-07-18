import { Request } from "express"
import Product from "../product/product"
import rateCountAndAmount from "../product/aggregations/productRateAmountAggregation"

const getProductsFromDB = async (req: Request) => {
    const { categories, name, tags, priceRange, brand } = req.query
    let { sort, fields, page, limit, rating } = req.query
    const queryObj: any = {}

    if (categories) {
        const categoriesArr = (categories as string).split(',')
        queryObj['categories.values'] = { $in: categoriesArr }
    }

    if (name) {
        queryObj.name = { $regex: name, $options: 'i' }
    }

    if (brand) {
        queryObj.brand = { $regex: brand, $options: 'i' }
    }

    if (tags) {
        const tagsArr = (tags as string).split(',')
        queryObj.tags = { $in: tagsArr }
    }

    if (rating) {
        rating = rating as string
        let rate: number = 0
        const regex = /^(?<flag>gt|gte|lte|lt)(?<value>\d+\.?\d*)$/

        if (regex.test(rating)) {
            const match = rating.match(regex)
            const groups = match ? match.groups : { value: '0', flag: 'gte' }
            rate = parseFloat(groups!.value)
            queryObj['rate.amount'] = { [`$${groups!.flag}`]: rate }
        }
    }

    if (priceRange) {
        const prices = (priceRange as string).split(',')
        const min = parseFloat(prices[0]) || 0
        const max = parseFloat(prices[1]) || 1000
        queryObj['$or'] = [
            { '$and': [{ 'priceRange.min': { $gte: min } }, { 'priceRange.min': { $lte: max } }] },
            { '$and': [{ 'priceRange.max': { $gte: min } }, { 'priceRange.max': { $lte: max } }] }
        ]
    }

    let result = Product.aggregate(rateCountAndAmount).match(queryObj)

    if (sort) {
        sort = (sort as string).split(',').join(' ')
        if (/(?<!-)price/.test(sort as string)) {
            sort = sort.replace(/price/, 'priceRange.min')
        }

        if (/(?<=-)price/.test(sort as string)) {
            sort = sort.replace(/price/, 'priceRange.max')
        }

        result = result.sort(sort)
    } else {
        result = result.sort('createdAt')
    }

    if (fields) {
        const fieldsSplitted = (fields as string).split(',')
        const fieldList = fieldsSplitted.reduce((accum, item) => {
            return {
                ...accum,
                [item]: 1
            }
        }, {})

        if (fieldsSplitted.length > 0) {
            result = result.project(fieldList)
        }
    }

    const currentPage: number = parseInt(page as string) || 1
    const limitProducts: number = parseInt(limit as string) || 10
    const skipProductsBy: number = (currentPage - 1) * limitProducts

    result = result.skip(skipProductsBy).limit(limitProducts)

    return await result
}

export default getProductsFromDB