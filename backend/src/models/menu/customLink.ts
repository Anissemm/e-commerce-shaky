import { Response, Request } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import { CustomLink } from "./menu"

export const addMenuCustomLink = async (req: Request, res: Response) => {
    const { menuId } = req.params
    const { url, name } = req.body
    console.log(menuId, url, name)
    if (!url || !name || !menuId) {
        throw new ClientError(400, 'missing-url-or-menuId-or-value')
    }

    const link = await CustomLink.create({ url, name, owner: menuId })

    return res.status(201).json({ message: 'link-created', success: true, data: link })
}

export const getMenuCustomLinks = async (req: Request, res: Response) => {
    const { menuId } = req.params

    if (!menuId) {
        throw new ClientError(400, 'missing-menuId')
    }

    const links = await CustomLink.find({ owner: menuId })

    return res.status(200).json({ message: 'successful', success: true, data: links })
}

export const updateMenuCustomLink = async (req: Request, res: Response) => {
    const { id } = req.params
    const { data } = req.body

    if (!id) {
        throw new ClientError(400, 'missing-link-id')
    }

    if (!data) {
        throw new ClientError(400, 'missing-data')
    }

    const link = await CustomLink.findByIdAndUpdate(id, data, { new: true })

    if (!link) {
        throw new ClientError(404, 'no-custom-link-with-such-id')
    }

    return res.status(200).json({ message: 'link-created', success: true, data: link })
}

export const deleteMenuCustomLink = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        throw new ClientError(400, 'missing-id')
    }

    const link = await CustomLink.findByIdAndDelete(id)

    return res.status(200).json({ message: 'link-deleted', success: true, data: link })
}
