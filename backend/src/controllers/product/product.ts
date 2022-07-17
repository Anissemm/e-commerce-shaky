import { Request, Response } from "express"
import { PipelineStage } from "mongoose"
import { ClientError, ServerError } from "../../ErrorHandling/errors"
import setCategories from "../../models/functions/setCategoriesOnNewDoc"
import Product from "../../models/product/product"
import rateCountAndAmount from "../../models/product/productRateAmountAggregation"

export const getProducts = async (req: Request, res: Response) => {
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

    const products = await result

    return res.status(200).json({ message: 'successfull', data: products, success: true })
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        throw new ClientError(400, 'missing-id')
    }

    const product = await Product.findById(id)

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    return res.status(200).json({ message: 'successful', success: true, data: product })
}

export const addProduct = async (req: Request, res: Response) => {
    const { product } = req.body

    if (product) {

        if (product.hasOwnProperty('categories')) {
            product.categories = await setCategories(product)
        }

        let toSave = await new Product(product)

        try {
            const saved = await toSave.save()
            return res.status(201).json({ message: 'product-created', success: true, data: saved })
        } catch (error: any) {
            throw new ServerError(500, error.message)
        }

    }

    throw new ClientError(400, 'no-provided-data')
}


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const { data } = req.body

    if (!data || !id) {
        throw new ClientError(400, 'no-data-to-update')
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })

    if (!updatedProduct) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    return res.status(200).json({ message: 'product-updated', success: true, data: updatedProduct })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw new ClientError(400, 'missing-or-invalid-id')
    }

    const product = await Product.findById(id)

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    try {
        await product.remove()
    } catch (error) {
        throw new ServerError(500, 'something-went-wrong-while-removing-product')
    }

    return res.status(200).json({ message: 'product-removed', success: true })
}