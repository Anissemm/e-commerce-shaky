import mongoose, { type PopulatedDoc, Types } from "mongoose"
import { UserDoc } from "../user/user"

const { Schema } = mongoose

export interface ProductRate extends Types.Subdocument {
    user: PopulatedDoc<UserDoc>
    rate: number
}

export const productRateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rate: {
        type: Number,
        default: 5.0
    }
})