import mongoose, {type Document, Types, PopulatedDoc} from 'mongoose'
import { UserDoc } from '../user/user'
import { ProductRate, productRateSchema } from './rate'
import { ProductReview, productReviewSchema } from './reviews'

const { Schema, model } = mongoose

type VariantsFeatures = [
    {
        variant: string
        price: number
        description?: string
    }
]

export interface Product extends Document {
    name: string
    brand: string
    slug: string
    description: string
    productPictures: string[]
    rate: Types.DocumentArray<PopulatedDoc<ProductRate>>,
    reviews: Types.DocumentArray<PopulatedDoc<ProductReview>>
    offer: {
        offerType: string
        description: string
    }
    variantFeatures?: VariantsFeatures
    price: {
        variantPrice: boolean
        value: number
        currency: string
    }
    createdBy: PopulatedDoc<UserDoc>
}

const productSchema = new Schema<Product>({
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
    productPictures: [String],
    rate: [productRateSchema], // to implement
    reviews: [productReviewSchema],
    offer: {
        type: Object,
        offerType: String,
        description: String,
    },
    variantFeatures: [
        {
            variant: String,
            price: {
                type: Number,
                default: 0.00
            },
            description: String
        }
    ],
    price: {
        variantPrice: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            default: 0
        },
        currency: String
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

const Product = model<Product>('Product', productSchema)

export default Product