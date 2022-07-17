import { Router } from 'express'
import { addCategory, getCategories } from '../../controllers/category/category'

const categoryRouter = Router()

categoryRouter.route('/categories').get(getCategories)
categoryRouter.route('/categories/add').put(addCategory)

export default categoryRouter