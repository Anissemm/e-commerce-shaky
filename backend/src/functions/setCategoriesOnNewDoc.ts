import slugify from "slugify"
import { ClientError, ServerError } from "../ErrorHandling/errors"
import Category, { CategoryDoc } from "../models/category"

const setCategories = async (product: any) => {
    const newCatArr: any[] = []
    const { categories } = product

    for (let category of categories) {
        const categObj = {
            category: typeof category === 'string' ? category : category.category,
            parent: typeof category === 'string' ? null : category.parent
        }

        const created = await setCategory(categObj)

        newCatArr.push(created)
    }

    return { docs: newCatArr, values: newCatArr.map(cat => cat.category) }
}

type CategoryValue = {
    category: string,
    parent?: null | string
}

export const setCategory = async (value: CategoryValue) => {
    let { parent, category } = value
    let parentCategory: null | CategoryDoc = null
    parent = !parent ? null : parent

    if (parent) {
        parentCategory = await Category.findById(parent)

        if (!parentCategory) {
            throw new ClientError(404, 'no-parent-category-with-such-parent-id')
        }
    }

    const slug = slugify(category, {lower: true, replacement: '_'})
    const updateCategory = await Category.findOneAndUpdate({ category, parent }, { category, parent, slug }, { upsert: true, new: true })

    if (parentCategory) {
        parentCategory.children.addToSet(updateCategory)
        await parentCategory.save()
    }

    return updateCategory

}

export default setCategories