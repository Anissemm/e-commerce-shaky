import { Request, Response } from "express"
import setNavigationMenu from "../../models/functions/setNavigationMenu"
import data from "../../data/menu"
import Menu, { MenuItem } from "../../models/menu/menu"
import slugify from "slugify"

export const createOrUpdateMenu = async (req: Request, res: Response) => {
    const name = 'Mock Menu'

    const menuSlug = slugify(name, { lower: true, replacement: '_' })
    
    await MenuItem.deleteMany({ menuSlug })

    const { menu: children, depth } = await setNavigationMenu(data, menuSlug)

    let menu = await Menu.findOneAndUpdate({ name, menuSlug }, { name, menuSlug, depth, children }, { upsert: true, new: true })

    return res.status(200).json({ ...menu.toObject() })
}       