import mongoose, { Document } from 'mongoose'
import slugify from 'slugify'

const { Schema, model } = mongoose

export interface TagDoc extends Document {
    value: string
    slug: string
}

const tagSchema = new Schema<TagDoc>({
    value: { 
        type: String,
        trim: true
    },
    slug: { 
        type: String,
        trim: true
    }
})

const Tag = model<TagDoc>('Tag', tagSchema)

export default Tag