import flatten from 'flat'
import { ServerError } from '../../ErrorHandling/errors'
import { MenuItem } from '../menu'
import Tag from '../product/tags'
import { setCategory } from './setCategoriesOnNewDoc'

const saveMenuItemToDb = async (menuItem: any, menuSlug: string) => {
    const { itemType, value } = menuItem
    const item = await new MenuItem()
    
    item.itemType = itemType
    item.menuSlug = menuSlug

    if (itemType === 'Category') {
        const category = await setCategory(value)
        item.reference = category
    }

    if (itemType === 'Tag') {
        const tag = await Tag.findOneAndUpdate({ value }, { value }, { upsert: true, new: true })
        item.reference = tag
    }

    try {
        return await item.save()
    } catch (error: any) {
        throw new ServerError(500, error.message)
    }
}

const recursiveSetting = async (items: any[], menuSlug: string): Promise<any> => {
    let children = []

    for (let item of items) {
        item = { ...item, menuSlug }
        let saved = await saveMenuItemToDb(item, menuSlug)
        if (item.hasOwnProperty('children')) {
            saved.children = await recursiveSetting(item.children, menuSlug)
            saved = await saved.save()
            children.push(saved)
        } else {
            children.push(saved)
        }
    }

    return children
}

const getMenuDepth = (menu: any): number => {
    const flattened = flatten(menu)
    const flattenedKeys = Object.keys(flattened as {})

    const depth = Math.max(...flattenedKeys.map((item: string) => {
        const splits = item.split('children')
        return splits.length - 1
    }))

    return depth
}

const setNavigationMenu = async (data: any, menuSlug: string) => {
    const { menu, auto } = data
    const depth = getMenuDepth(menu)
    if (!auto && menu) {
        const copy = menu.children.slice()

        return {
            menu: await recursiveSetting(copy, menuSlug),
            depth
        }
    }

    return {
        menu: [],
        depth: 0
    }


}

export default setNavigationMenu