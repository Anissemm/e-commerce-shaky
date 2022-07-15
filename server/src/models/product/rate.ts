import mongoose, { type PopulatedDoc, Types } from "mongoose"
import { UserDoc } from "../user"
import { Product } from "./product"

const { Schema, model } = mongoose

export interface ProductRate extends Types.Subdocument {
    user: PopulatedDoc<UserDoc>
    rate: number
}

export const productRateSchema = new Schema<ProductRate>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rate: {
        type: Number,
        default: 5.0
    }
})

const Rate = model('Product_rate', productRateSchema)

export default Rate