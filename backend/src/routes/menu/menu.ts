import { Router } from 'express'
import { createOrUpdateMenu } from '../../controllers/menu/menu'
import { addMenuCustomLink, deleteMenuCustomLink, getMenuCustomLinks, updateMenuCustomLink } from '../../models/menu/customLink'

const menuCreatorRouter = Router()

menuCreatorRouter.route('/menu/set').put(createOrUpdateMenu)
menuCreatorRouter.route('/menu/:menuId/links').get(getMenuCustomLinks).post(addMenuCustomLink)
menuCreatorRouter.route('/menu/link/:id').delete(deleteMenuCustomLink).patch(updateMenuCustomLink)

export default menuCreatorRouter