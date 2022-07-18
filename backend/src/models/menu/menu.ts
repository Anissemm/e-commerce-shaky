import mongoose, { PopulatedDoc, type Document } from 'mongoose'
import { CategoryDoc } from '../category'
import { TagType } from '../tags'
import autopopulate from 'mongoose-autopopulate'
import slugify from 'slugify'

const { Schema, model } = mongoose

export interface CustomLinkType {
    url: string
    name: string
    owner: PopulatedDoc<MenuDoc>
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
    owner: { type: Schema.Types.ObjectId, ref: 'Menu' }
})

export interface MenuItemType {
    reference: PopulatedDoc<CategoryDoc | TagType>
    menuSlug: string
    itemType: 'Category' | 'Tag' | 'Custom_Link'
    children: Array<PopulatedDoc<MenuItemDoc>>
    url?: string | URL
}

interface MenuItemDoc extends MenuItemType, Document { }

const menuItemSchema = new Schema<MenuItemDoc>({
    menuSlug: String,
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
    url: String
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
    name: String,
    depth: Number,
    menuSlug: String,
    children: [{ type: Schema.Types.ObjectId, ref: 'Menu_Item', autopopulate: true }]
})

menuSchema.plugin(autopopulate)

export const CustomLink = model<CustomLinkDoc>('Custom_Link', customLinkSchema)

export const MenuItem = model<MenuItemDoc>('Menu_Item', menuItemSchema)

const Menu = model<MenuDoc>('Menu', menuSchema)

export default Menu
