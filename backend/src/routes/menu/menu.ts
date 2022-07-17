import { Router } from 'express'
import { createOrUpdateMenu } from '../../controllers/menu/menu'

const menuCreatorRouter = Router()

menuCreatorRouter.route('/menu/set').put(createOrUpdateMenu)

export default menuCreatorRouter