import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import Category, { CategoryDoc } from "../../models/category"
import { setCategory } from "../../models/functions/setCategoriesOnNewDoc"

export const getCategories = async (req: Request, res: Response) => {
    const categories = await Category.find({ parent: { $eq: null } })
    return res.status(200).json(categories)
}

export const addCategory = async (req: Request, res: Response) => {
    let { value, parent } = req.body

    if (!value) {
        throw new ClientError(400, 'missing-value')
    }

    if (!parent) {
        parent = null
    }

    const category = await setCategory({ value, parent } as CategoryDoc)

    return res.status(201).json({ message: 'category-created', success: true, data: category })
}