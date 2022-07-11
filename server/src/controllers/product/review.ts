import { Request, Response } from "express";
import { ClientError, ServerError } from "../../ErrorHandling/errors";
import Product from "../../models/product/product";
import { productRateSchema } from "../../models/product/rate";

export const getReviews = async (req: Request, res: Response) => {
    const { productId } = req.params
    const product = await Product.findById(productId)

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    const reviews = product.reviews ? product.reviews : []

    res.status(200).json({ message: 'successful', status: true, data: reviews })
}

export const getReview = async (req: Request, res: Response) => {
    const { productId, reviewId } = req.params

    if (!productId || !reviewId) {
        throw new ClientError(400, 'missing-product-or-review-id')
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    const review = product.reviews.id(reviewId)

    if (!review) {
        throw new ClientError(404, 'no-review-with-such-id')
    }

    res.status(200).json({ message: 'successful', success: true, data: review })
}

export const addReview = async (req: Request, res: Response) => {
    const { productId } = req.params
    const { review } = req.body

    if (!productId || !review?.userId) {
        throw new ClientError(400, 'missing-product-or-user-id')
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    product.reviews.push(review)

    try {
        await product.save()
    } catch (error) {
        throw new ServerError(500, 'something-went-wrong-while-removing-product')
    }

    return res.status(201).json({ message: 'review-created', success: true })

}

export const updateReview = async (req: Request, res: Response) => {
    const { productId, reviewId } = req.params
    const { review } = req.body

    if (!productId || !reviewId) {
        throw new ClientError(400, 'missing-product-or-review-id')
    }

    if (!review) {
        throw new ClientError(400, 'nothing-to-update')
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    product.reviews.id(reviewId).content = review

    try {
        await product.save()
    } catch (error) {
        throw new ServerError(500, 'something-went-wrong-while-removing-review')
    }

    return res.status(200).json({ message: 'review-updated', success: true })
}

export const deleteReview = async (req: Request, res: Response) => {
    const { productId, reviewId } = req.params

    if (!productId || !reviewId) {
        throw new ClientError(400, 'missing-product-or-review-id')
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    product.reviews.id(reviewId).remove()

    try {
        await product.save()
    } catch (error) {
        throw new ServerError(500, 'something-went-wrong-while-removing-review')
    }
} 