import mongoose, { type PopulatedDoc, Document, Types } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const { Schema, model } = mongoose

export interface CategoryDoc extends Document {
    children: Types.Array<PopulatedDoc<CategoryDoc>>
    parent: PopulatedDoc<CategoryDoc>
    value: string
}

const categorySchema = new Schema<CategoryDoc>({
    children: [{ type: Schema.Types.ObjectId, ref: 'Category', autopopulate: true}],
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    value: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
}, { timestamps: true })

categorySchema.plugin(autopopulate)

const Category = model<CategoryDoc>('Category', categorySchema)

export default Category