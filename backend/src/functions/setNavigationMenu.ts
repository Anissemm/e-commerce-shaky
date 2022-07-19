import flatten from 'flat'
import slugify from 'slugify'
import { ServerError } from '../ErrorHandling/errors'
import { CustomLink, MenuItem, MenuItemDoc, PostType } from '../models/menu/menu'
import Tag from '../models/tags'
import { setCategory } from './setCategoriesOnNewDoc'

type CategoryValue = { category: string, parent: string | null }
type LinkType = { name: string, url: string }

type ItemType = {
    itemType: "Category" | "Tag" | "Custom_Link"
    value: CategoryValue | LinkType | string
    menuSlug: string
    parentRefId?: null | string
    currentDepth: number
    postsType: PostType
    children: ItemType[]
}

const saveMenuItemToDb = async (menuItem: any) => {
    const { itemType, value, parentRefId, menuSlug, currentDepth, postsType }: ItemType = menuItem
    const item = new MenuItem()

    item.itemType = itemType
    item.menuSlug = menuSlug
    item.depth = currentDepth
    item.postsType = postsType

    if (itemType === 'Category') {
        let category = await setCategory(value as CategoryValue)
        item.reference = category
        item.value = category.category
        item.itemSlug = category.slug
    }

    if (itemType === 'Tag') {
        const slug = slugify(value as string, { lower: true, replacement: '_' })
        const tag = await Tag.findOneAndUpdate({ value }, { value, slug }, { upsert: true, new: true })
        item.reference = tag
        item.value = tag.value
        item.itemSlug = slug
    }

    if (itemType === 'Custom_Link') {
        const slug = slugify((value as LinkType).name, { lower: true, replacement: '_' })
        const link = await CustomLink.findOneAndUpdate({ ...value as LinkType, slug, owner: menuSlug }, { value, slug }, { upsert: true, new: true })

        item.reference = link
        item.value = link.name
        item.url = link.url
        item.itemSlug = slug
    }

    try {
        return await item.save()
    } catch (error: any) {
        throw new ServerError(500, error.message)
    }
}

interface RecursiveMenuSetting {
    (
        items: ItemType[],
        menuSlug: string,
        maxDepth?: number,
        parentItem?: ItemType | null,
        currentDepth?: number,
    ): Promise<MenuItemDoc[]>
}

const recursiveSetting: RecursiveMenuSetting = async (items, menuSlug, maxDepth = 2, parentItem = null, currentDepth = 0) => {
    let children: MenuItemDoc[] = []

    if (currentDepth === maxDepth + 1) {
        return children
    }

    for (let item of items) {
        item = { ...item, menuSlug, currentDepth }
        let saved = await saveMenuItemToDb({ ...item, parentRefId: parentItem?.parentRefId })
        item = { ...item, parentRefId: saved.itemType === 'Category' ? saved.reference?.id : null }

        if (item.hasOwnProperty('children')) {
            saved.children = await recursiveSetting(item.children, menuSlug, maxDepth, item, currentDepth + 1)
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
        return splits.length - 2
    }))

    return depth
}

interface NavigationMenuOptions {
    menuSlug: string
    maxDepth?: number
}

const defaultOptions: NavigationMenuOptions = {
    menuSlug: 'menu',
    maxDepth: 2
}

const setNavigationMenu = async (data: any, options = defaultOptions) => {
    const { menu, auto } = data
    const { menuSlug, maxDepth } = options

    const depth = getMenuDepth(menu)
    if (!auto && menu) {
        const copy = menu.children.slice()

        return {
            menu: await recursiveSetting(copy, menuSlug, maxDepth),
            depth
        }
    }

    return {
        menu: [],
        depth: 0
    }


}

export default setNavigationMenu