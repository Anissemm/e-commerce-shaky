import mongoose, { PopulatedDoc, type Document } from 'mongoose'
import { CategoryDoc } from './category'
import { TagType } from './product/tags'
import autopopulate from 'mongoose-autopopulate'
import slugify from 'slugify'

const { Schema, model } = mongoose

export interface CustomLinkType {
    url: string
    name: string
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
    }
})

export interface MenuItemType {
    reference: PopulatedDoc<CategoryDoc | TagType>
    itemType: 'Category' | 'Tag' | 'Custom_Link'
    children: Array<PopulatedDoc<MenuItemDoc>>
    level: number
}

interface MenuItemDoc extends MenuItemType, Document { }

const menuItemSchema = new Schema<MenuItemDoc>({
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
    level: {
        type: Number,
        integer: true,
        default: 0
    }
})

menuItemSchema.plugin(autopopulate)

export interface MenuType {
    name: string
    menuSlug: string
    children: {
        level: number,
        items: Array<PopulatedDoc<MenuItemDoc>>
    },
    levels: number
}

interface MenuDoc extends MenuType, Document { }

const menuSchema = new Schema<MenuDoc>({
    name: String,
    menuSlug: String,
    children: {
        level: Number,
        items: [{ type: Schema.Types.ObjectId, ref: 'Menu_Item' }]
    },
    levels: {
        type: Number,
        default: 1
    }
})

menuSchema.pre('save', async function (this: MenuDoc) {
    if (this.isModified('name')) {
        this.menuSlug = slugify(this.name, { replacement: '_', lower: true })
    }
})


export const CustomLink = model<CustomLinkDoc>('Custom_Link', customLinkSchema)

export const MenuItem = model<MenuItemDoc>('Menu_Item', menuItemSchema)

const Menu = model<MenuDoc>('Menu', menuSchema)

export default Menu
