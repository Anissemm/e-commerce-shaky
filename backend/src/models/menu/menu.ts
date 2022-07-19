import mongoose, { PopulatedDoc, type Document } from 'mongoose'
import { CategoryDoc } from '../category'
import { TagDoc } from '../tags'
import autopopulate from 'mongoose-autopopulate'

const { Schema, model } = mongoose

export interface CustomLinkType {
    url: string
    name: string
    slug: string
    owner: string
    ownerRef: PopulatedDoc<MenuDoc>
}

interface CustomLinkDoc extends CustomLinkType, Document { }

const customLinkSchema = new Schema<CustomLinkDoc>({
    url: {
        type: String,
        default: '#'
    },
    name: {
        type: String,
        default: 'Link'
    },
    slug: String,
    owner: String,
    ownerRef: { type: Schema.Types.ObjectId, ref: 'Menu' }
})

customLinkSchema.post('findOneAndUpdate' as 'updateOne', async function (link: CustomLinkDoc, next) {
    const owner = await Menu.findOne({ menuSlug: link.owner })
    link.ownerRef = owner
    await link.save()
    next()
})

export type PostType = 'product' | 'blog' | 'page' | 'any'

export interface MenuItemType {
    reference: PopulatedDoc<CategoryDoc | TagDoc>
    depth: number
    value: string
    postsType: PostType
    itemSlug: string
    menuSlug: string
    itemType: 'Category' | 'Tag' | 'Custom_Link'
    children: Array<PopulatedDoc<MenuItemDoc>>
    url?: string | URL
}

export interface MenuItemDoc extends MenuItemType, Document { }

const menuItemSchema = new Schema<MenuItemDoc>({
    postsType: {
        type: String,
        enum: ['product', 'blog', 'page', 'external'],
        trim: true
    },
    value: {
        type: String,
        trim: true
    },
    menuSlug: {
        type: String,
        trim: true
    },
    itemSlug: {
        type: String,
        trim: true
    },
    depth: Number,
    reference: {
        type: Schema.Types.ObjectId,
        refPath: 'itemType',
        autopopulate: true
    },
    children: [{ type: Schema.Types.ObjectId, ref: 'Menu_Item', autopopulate: true }],
    itemType: {
        type: String,
        trim: true,
        default: 'Category',
        enum: ['Category', 'Tag', 'Custom_Link']
    },
    url: {
        type: String,
        trim: true
    },
})

menuItemSchema.plugin(autopopulate)

export interface MenuType {
    name: string
    menuSlug: string
    depth: number
    children: Array<PopulatedDoc<MenuItemDoc>>
}

interface MenuDoc extends MenuType, Document { }

const menuSchema = new Schema<MenuDoc>({
    name: {
        type: String,
        trim: true
    },
    depth: Number,
    menuSlug: {
        type: String,
        trim: true
    },
    children: [{ type: Schema.Types.ObjectId, ref: 'Menu_Item', autopopulate: true }]
})

menuSchema.plugin(autopopulate)

export const CustomLink = model<CustomLinkDoc>('Custom_Link', customLinkSchema)

export const MenuItem = model<MenuItemDoc>('Menu_Item', menuItemSchema)

const Menu = model<MenuDoc>('Menu', menuSchema)

export default Menu
