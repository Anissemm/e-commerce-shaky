import Category, { CategoryDoc } from "../category"
import { type ProductType } from '../product/product'

const setCategories = async (product: ProductType) => {
    const { categories } = product
    const newCatArr = []
    for (let category of categories!) {
        let query = {}
        let value = {}

        if (typeof category === 'string') {
            query = { value: category, parent: { $eq: null } }
            value = { value: category }
        } else {
            query = value = { value: category.value, parent: (category as CategoryDoc).parent }
        }

        const updatedCategory: CategoryDoc | null = await Category.findOneAndUpdate(query, value, { upsert: true, new: true })

        if (updatedCategory) {
            newCatArr.push(updatedCategory)
        }
    }

    return { docs: newCatArr, values: newCatArr.map(cat => cat.value) }
}

export default setCategories