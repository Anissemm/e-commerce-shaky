import dotenv from 'dotenv'
import connectDB from './config/connectDB'
import products from './data/products'
import setCategories from './models/functions/setCategoriesOnNewDoc'
import Product from './models/product/product'
dotenv.config()

const DELETE_AND_SEED = process.env.DELETE === 'true'

const seed = async () => {
    try {
        await connectDB()
        if (DELETE_AND_SEED) {
            await Product.deleteMany({})
        }

        for (let i = 0; i < products.length; i++) {
            if (products[i].hasOwnProperty('categories')) {
                products[i].categories = await setCategories(products[i] as any) as any
            }
        }

        await Product.create(products)
        console.log('Products seeded!')
        process.exit()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

seed()