import mongoose, { type Document, Types, PopulatedDoc } from 'mongoose'
import { UserDoc } from '../user'
import { ProductOffers, productOffersSchema } from './offer'
import { ProductRate } from './rate'
import { ProductReview } from './review'
import { CategoryDoc } from '../category'
import { ServerError } from '../../ErrorHandling/errors'
import Tag from './tags'

const { Schema, model } = mongoose

type Variants = [
    {
        variant: string
        price: number
        currency: string,
        flavours: string[]
        description?: string
    }
]

export interface Product {
    name: string
    brand: string
    slug?: string
    description: string
    productPictures?: string[]
    categories?: Array<string | CategoryDoc>
    tags?: string[]
    rate?: {
        values: Types.Array<PopulatedDoc<ProductRate>>,
    },
    reviews?: Types.DocumentArray<PopulatedDoc<ProductReview>>
    offers?: Types.DocumentArray<ProductOffers>
    variants: Variants
    priceRange?: {
        min: number,
        max: Number
    }
    currency?: string
    createdBy: PopulatedDoc<UserDoc>
}

export interface ProductDoc extends Omit<Product, 'categories' | 'slug'>, Document {
    categories: {
        docs: Array<PopulatedDoc<CategoryDoc>>,
        values: string[]
    },
    slug: string
}

const productSchema = new Schema<ProductDoc>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    brand: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    categories: {
        values: [String],
        docs: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
    },
    tags: {
        type: [String],
        default: []
    },
    productPictures: {
        type: [String],
        default: []
    },
    rate: {
        values: [{ type: Schema.Types.ObjectId, ref: 'Product_rate' }],
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Product_review' }],
    offers: [productOffersSchema],
    variants: [
        {
            variant: String,
            value: String,
            price: {
                type: Number,
                default: 0.00
            },
            currency: String,
            flavours: [String],
            description: String
        }
    ],
    priceRange: {
        min: Number,
        max: Number
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const setTags = async (product: ProductDoc) => {
    if (product.isModified('tags')) {
        const tags = product.tags ? product.tags : []
        await Tag.bulkWrite(tags.map((tag: string) => (
            {
                updateOne: {
                    filter: { value: tag },
                    update: { $set: { value: tag } },
                    upsert: true
                }
            })
        ))
    }
}

const setDefaultStartingPrice = async (product: ProductDoc) => {
    if (!product.isModified('startingPrice')) {
        const prices = product.variants.map(variant => variant.price)
        product.priceRange = {
            min: Math.min(...prices),
            max: Math.max(...prices)
        }
    }
}

productSchema.pre('save', async function (this: ProductDoc, next) {
    try {
        await setDefaultStartingPrice(this)
        await setTags(this)
        next()
    } catch (error: any) {
        throw new ServerError(500, error.message)
    }
})

const Product = model<ProductDoc>('Product', productSchema)

export default Product