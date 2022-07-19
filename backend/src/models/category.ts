import mongoose, { type PopulatedDoc, Document, Types } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
const { Schema, model } = mongoose

export interface CategoryDoc extends Document {
    children: Types.Array<PopulatedDoc<CategoryDoc>>
    parent: PopulatedDoc<CategoryDoc>
    slug: string
    category: string
}

const categorySchema = new Schema<CategoryDoc>({
    children: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Category', autopopulate: true }],
        default: []
    },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    slug: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true })

categorySchema.plugin(autopopulate)

const Category = model<CategoryDoc>('Category', categorySchema)

export default Category