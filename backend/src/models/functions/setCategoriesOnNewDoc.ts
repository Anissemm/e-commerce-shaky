import { ClientError, ServerError } from "../../ErrorHandling/errors"
import Category, { CategoryDoc } from "../category"
import { type Product } from '../product/product'

const setCategories = async (product: Product) => {
    const { categories } = product
    const newCatArr = []
    for (let category of categories!) {
        let updatedCategory: CategoryDoc | null = null

        if (typeof category === 'string') {
            const query = { value: category, parent: { $eq: null }}
            const value = { value: category, parent: null, children: null }

            updatedCategory = await Category.findOneAndUpdate(query, value, { upsert: true, new: true })

        } else {
            const parentCategory = await Category.findById(category.parent)

            if (!parentCategory) {
                throw new ClientError(404, `no-parent-category-for-${category.value}-with-id-${category.parent}`)
            }

            const value = { value: category.value, parent: category.parent, children: [] }
            updatedCategory = await Category.findOneAndUpdate(value, { upsert: true, new: true })

            parentCategory.children.addToSet(updatedCategory)

            try {
                await parentCategory.save()
            } catch (error: any) {
                throw new ServerError(500, error.message)
            }
        }


        if (updatedCategory) {
            newCatArr.push(updatedCategory)
        }
    }

    return { docs: newCatArr, values: newCatArr.map(cat => cat.value) }
}

export const setCategory = async (category: string | CategoryDoc) => {
    let updatedCategory: CategoryDoc | null = null

    if (typeof category === 'string') {
        const query = { value: category, parent: { $eq: null }}
        const value = { value: category }

        updatedCategory = await Category.findOneAndUpdate(query, value, { upsert: true, new: true })

    } else {
        const parentCategory = await Category.findById(category.parent)

        if (!parentCategory) {
            throw new ClientError(404, `no-parent-category-for-${category.value}-with-id-${category.parent}`)
        }

        const value = { value: category.value, parent: category.parent }
        updatedCategory = await Category.findOneAndUpdate(value, value, { upsert: true, new: true })

        parentCategory.children.addToSet(updatedCategory)

        try {
            await parentCategory.save()
        } catch (error: any) {
            throw new ServerError(500, error.message)
        }
    }

    return updatedCategory
}

export default setCategories