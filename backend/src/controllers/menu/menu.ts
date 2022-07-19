import { Request, Response } from "express"
import setNavigationMenu from "../../functions/setNavigationMenu"
import data from "../../config/data/menu"
import Menu, { MenuItem } from "../../models/menu/menu"
import slugify from "slugify"
import { ClientError } from "../../ErrorHandling/errors"

export const createOrUpdateMenu = async (req: Request, res: Response) => {
    const name = 'Header Menu'

    const menuSlug = slugify(name, { lower: true, replacement: '_' })

    await MenuItem.deleteMany({ menuSlug })

    const { menu: children, depth } = await setNavigationMenu(data, { menuSlug })

    let menu = await Menu.findOneAndUpdate({ name, menuSlug }, { name, menuSlug, depth, children }, { upsert: true, new: true })

    return res.status(200).json({ ...menu.toObject() })
}

export const getMenu = async (req: Request, res: Response) => {
    const { menuSlug } = req.params

    if (!menuSlug) {
        throw new ClientError(400, 'missing-menu-slug')
    }

    const menu = await Menu.findOne({ menuSlug })

    if (!menu) {
        throw new ClientError(404, 'no-menu-with-such-slug')
    }

    return res.status(200).json({ success: true, message: 'successful', menu })
}

