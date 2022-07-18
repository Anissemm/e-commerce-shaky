import { Request, Response } from "express"
import { AnyBulkWriteOperation, PullOperator } from "mongodb"
import { ClientError } from "../../ErrorHandling/errors"
import Category, { CategoryDoc } from "../../models/category"
import { setCategory } from "../../models/functions/setCategoriesOnNewDoc"
import categoryRouter from "../../routes/category/category"

export const getCategories = async (req: Request, res: Response) => {
    const categories = await Category.find({ parent: { $eq: null } }).populate('children')
    return res.status(200).json(categories)
}

export const addCategory = async (req: Request, res: Response) => {
    let { category, parent } = req.body

    if (!category) {
        throw new ClientError(400, 'missing-value')
    }

    const createdCategory = await setCategory({ category, parent })

    return res.status(201).json({ message: 'category-created', success: true, data: createdCategory })
}

const getBulkWriteOperation = (deletedCategory: CategoryDoc) => {
    let queries = []

    if (deletedCategory.parent) {
        queries.push(
            {
                updateOne: {
                    filter: { _id: { $eq: deletedCategory.parent } },
                    update: { $pull: { children: { $eq: deletedCategory.id } } }
                }
            }
        )
    }

    if (deletedCategory.children.length > 0) {
        queries.push(
            {
                updateMany: {
                    filter: { parent: { $eq: deletedCategory.id } },
                    update: { $set: { parent: null } }
                }
            }
        )
    }

    return queries as AnyBulkWriteOperation[]
}

export const deleteCategories = async (req: Request, res: Response) => {
    const { ids } = req.body
    const deletedDocs: CategoryDoc[] = []
    const errorsArr: string[] = []

    if (ids.length === 0) {
        throw new ClientError(400, 'missing-category-id')
    }

    if (ids.some((item: any) => typeof item !== 'string')) {
        throw new ClientError(400, 'ids-must-be-of-type-string')
    }

    for (let id of ids) {
        const deletedCategory = await Category.findByIdAndDelete(id)

        if (deletedCategory) {
            deletedDocs.push(deletedCategory)

            await Category.bulkWrite(getBulkWriteOperation(deletedCategory))

        } else {
            errorsArr.push(`${id}: no-category-with-such-id`)
        }

    }

    if (errorsArr.length === ids.length) {
        throw new ClientError(400, 'failed-to-delete-categories')
    }


    const response: any = { success: true, message: 'categories-deleted' }

    if (errorsArr.length > 0) {
        response.message = 'failed-to-delete-some-categories'
        response.errors = errorsArr
    }

    return res.status(200).json(response)
}
