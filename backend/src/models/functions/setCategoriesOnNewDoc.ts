import { ClientError, ServerError } from "../../ErrorHandling/errors"
import Category, { CategoryDoc } from "../category"

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

// const setCategories = async (product: any) => {
//     const { categories } = product
//     const newCatArr = []
//     for (let category of categories!) {
//         let updatedCategory: CategoryDoc | null = null

//         if (typeof category === 'string') {
//             const query = { category: category, parent: { $eq: null }}
//             const value = { category: category, parent: null, children: [] }

//             updatedCategory = await Category.findOneAndUpdate(query, value, { upsert: true, new: true })

//         } else {
//             const parentCategory = await Category.findById(category.parent)

//             if (!parentCategory) {
//                 throw new ClientError(404, `no-parent-category-for-${category.value}-with-id-${category.parent}`)
//             }

//             const value = { category: category.value, parent: category.parent, children: [] }
//             updatedCategory = await Category.findOneAndUpdate(value, { upsert: true, new: true })

//             parentCategory.children.addToSet(updatedCategory)

//             try {
//                 await parentCategory.save()
//             } catch (error: any) {
//                 throw new ServerError(500, error.message)
//             }
//         }


//         if (updatedCategory) {
//             newCatArr.push(updatedCategory)
//         }
//     }

//     return { docs: newCatArr, values: newCatArr.map(cat => cat.category) }
// }

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

    const updateCategory = await Category.findOneAndUpdate({ category, parent }, { category, parent }, { upsert: true, new: true })

    if (parentCategory) {
        parentCategory.children.addToSet(updateCategory)
        await parentCategory.save()
    }

    return updateCategory

}

export default setCategories