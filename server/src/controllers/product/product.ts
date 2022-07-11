import { Request, Response } from "express"
import { ClientError, ServerError } from "../../ErrorHandling/errors"
import Product from "../../models/product/product"

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.find({})

    return res.status(200).json({ message: 'successfull', data: products, success: true })
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        throw new ClientError(400, 'missing-id')
    }

    const product = await Product.findById(id, { new: true })

    if (!product) {
        throw new ClientError(404, 'no-product-with-such-id')
    }

    return res.status(200).json({ message: 'product-updated', success: true, data: product })
}

export const addProduct = async (req: Request, res: Response) => {
    const { product } = req.body

    if (product) {
        const saved = await Product.create(product)

        return res.status(201).json({ message: 'product-created', success: true, data: saved })
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

    return res.status(200).json({ message: 'product-updated', success: true, data: updateProduct })
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