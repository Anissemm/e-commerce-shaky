import { Request, Response } from "express"
import { ClientError, ServerError } from "../../ErrorHandling/errors"
import Product from "../../models/product/product"
import Rate from "../../models/product/rate"

export const setRate = async (req: Request, res: Response) => {
    const { productId, userId } = req.params
    const { rate } = req.body

    if (!productId || !userId) {
        throw new ClientError(400, 'missing-product-or-user-id')
    }

    const product = await Product.findById(productId).populate('rate.values')

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    if (typeof rate !== 'number') {
        throw new ClientError(400, 'invalid-rate-type-(must-be-of-type-number)')
    }

    const rateDoc = product.rate!.values.find(rate => rate.user.equals(userId))

    if (rateDoc) {
        await Rate.findOneAndUpdate({ user: userId, _id: rateDoc._id }, { rate }, { new: true })
        return res.status(200).json({ message: 'rate-updated', success: true })
    }

    const newRate = await Rate.create({ user: userId, rate })
    product.rate!.values.push(newRate)

    try {
        await product.save()
    } catch (error) {
        console.log(error)
        throw new ServerError(500, 'something-went-wrong-while-adding-rate')
    }

    return res.status(201).json({ message: 'rate-added', success: true })

}

export const deleteRate = async (req: Request, res: Response) => {
    const { productId, userId } = req.params

    if (!productId || !userId) {
        throw new ClientError(400, 'missing-product-or-user-id')
    }

    const product = await Product.findById(productId).populate('rate.values')

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    const userRate = product.rate!.values.find(rate => rate.user.equals(userId))

    if (!userRate) {
        return res.status(404).json({ message: 'nothing-to-remove', success: false })
    }

    product.rate!.values.pull(userRate)

    try {
        await product.save()
    } catch (error) {
        throw new ServerError(500, 'something-went-wrong-while-deleting-rate')
    }

    await Rate.findByIdAndRemove(userRate.id)

    return res.status(201).json({ message: 'rate-deleted', success: true })

}