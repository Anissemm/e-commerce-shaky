import { Router } from 'express'
import { createOrUpdateMenu, getMenu } from '../../controllers/menu/menu'
import { addMenuCustomLink, deleteMenuCustomLink, getMenuCustomLinks, updateMenuCustomLink } from '../../controllers/menu/customLink'

const menuRouter = Router()

menuRouter.route('/menu/set').put(createOrUpdateMenu)
menuRouter.route('/menu/:menuSlug').get(getMenu)
menuRouter.route('/menu/:menuSlug/links').get(getMenuCustomLinks).post(addMenuCustomLink)
menuRouter.route('/menu/link/:id').delete(deleteMenuCustomLink).patch(updateMenuCustomLink)

export default menuRouter