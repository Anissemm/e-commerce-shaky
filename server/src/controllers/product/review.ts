import { Request, Response } from "express"
import mongoose from "mongoose"
import { ClientError, ServerError } from "../../ErrorHandling/errors"
import Product from "../../models/product/product"
import Review from "../../models/product/review"

export const getReviews = async (req: Request, res: Response) => {
    const { productId } = req.params
    const product = await Product.findById(productId).populate('reviews')

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    const reviews = product.reviews ? product.reviews : []

    return res.status(200).json({ message: 'successful', status: true, data: reviews })
}

export const getReview = async (req: Request, res: Response) => {
    const { productId, userId } = req.params

    if (!productId || !userId) {
        throw new ClientError(400, 'missing-product-or-review-id')
    }

    const product = await Product.findById(productId).populate('reviews')

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    const review = product.reviews!.find(review => review.user.equals(userId))

    if (!review) {
        throw new ClientError(404, 'no-review-with-such-id')
    }

    res.status(200).json({ message: 'successful', success: true, data: review })
}

export const setReview = async (req: Request, res: Response) => {
    const { productId, userId } = req.params
    const { content } = req.body

    if (!productId || !userId) {
        throw new ClientError(400, 'missing-product-or-user-id')
    }

    const product = await Product.findById(productId).populate('reviews')

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    const userReview = product.reviews!.find(rate => rate.user.equals(userId))

    if (userReview) {
        await Review.findOneAndUpdate({ user: userId, _id: userReview._id }, { content }, { upsert: true, new: true })
        return res.status(200).json({ message: 'review-updated', success: true })
    }

    const reviewDoc = await Review.create({ user: userId, content })
    product.reviews!.push(reviewDoc)

    try {
        await product.save()
    } catch (error) {
        throw new ServerError(500, 'something-went-wrong-while-adding-review')
    }

    return res.status(201).json({ message: 'review-created', success: true })

}

export const deleteReview = async (req: Request, res: Response) => {
    const { productId, userId } = req.params

    if (!productId || !userId) {
        throw new ClientError(400, 'missing-product-or-user-id')
    }

    const product = await Product.findById(productId).select('reviews').populate('reviews')

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    const reviewDoc = product.reviews!.find(review => review.user.equals(userId))

    if (!reviewDoc) {
        return res.status(404).json({ message: 'no-review-to-remove', success: false })
    }

    product.reviews!.pull(reviewDoc)

    try {
        await product.save()
    } catch (error) {
        throw new ServerError(500, 'something-went-wrong-while-deleting-review')
    }

    await Review.findByIdAndRemove(reviewDoc.id)

    return res.status(201).json({ message: 'review-deleted', success: true })

} 