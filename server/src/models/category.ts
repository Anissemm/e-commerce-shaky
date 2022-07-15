import mongoose, {type PopulatedDoc, Document } from 'mongoose'

const { Schema, model } = mongoose

export interface CategoryDoc extends Document {
    parent: PopulatedDoc<CategoryDoc>
    value: string

}

const categorySchema = new Schema<CategoryDoc>({
    parent: {type: Schema.Types.ObjectId, ref: 'Category'},
    value: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
})

const Category = model<CategoryDoc>('Category', categorySchema)

export default Category