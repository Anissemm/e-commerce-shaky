import mongoose, { Document } from 'mongoose'

const { Schema, model } = mongoose

export interface TagType extends Document {
    value: string
}

const TagSchema = new Schema<TagType>({
    value: String
})

const Tag = model('Tag', TagSchema)

export default Tag