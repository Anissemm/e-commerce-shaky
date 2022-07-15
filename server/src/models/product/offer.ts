import mongoose, { Types } from 'mongoose'

const { Schema } = mongoose

export interface ProductOffers extends Types.Subdocument {
    offerType: string
    value: number
    description: string
}

export const productOffersSchema = new Schema<ProductOffers>({  
    offerType: String,
    description: String,
    value: String
})