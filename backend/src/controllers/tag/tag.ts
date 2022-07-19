import { Request, Response } from "express"
import slugify from "slugify"
import { ClientError } from "../../ErrorHandling/errors"
import Tag from "../../models/tags"

export const getTags = async (req: Request, res: Response) => {
    const tags = await Tag.find({})

    return res.status(200).json({ message: 'successful', success: true, data: tags })
}

export const addTag = async (req: Request, res: Response) => {
    const { value } = req.body

    if (!value) {
        throw new ClientError(400, 'missing-value')
    }

    const slug = slugify(value, { lower: true, replacement: '_' })

    const tag = await Tag.findOneAndUpdate({ value }, { value, slug }, { upsert: true, new: true })

    return res.status(201).json({ message: 'tag-created', success: true, data: tag })
}

export const deleteTag = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        throw new ClientError(400, 'missing-id')
    }

    const tag = await Tag.findByIdAndDelete(id)

    return res.status(201).json({ message: 'tag-created', success: true, data: tag })
}