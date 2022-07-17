import mongoose, {type Document, Types, PopulatedDoc} from "mongoose"
import { UserDoc } from "../user"

const { Schema, model } = mongoose

export interface ProductReview extends Types.Subdocument {
    user: PopulatedDoc<UserDoc>
    content: string
    id: () => ProductReview | null | undefined
}

export const productReviewSchema = new Schema<ProductReview>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {
        type: String,
        trim: true,
        default: ''
    }
})

const Review = model('Product_review', productReviewSchema)

export default Review
