import mongoose, {type Document, Types, PopulatedDoc} from "mongoose"
import { UserDoc } from "../user/user"

const { Schema } = mongoose

export interface ProductReview extends Types.Subdocument {
    user: PopulatedDoc<UserDoc>
    content: string
    id: () => ProductReview | null | undefined
}

export const productReviewSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {
        Type: String,
        default: ''
    }
})
