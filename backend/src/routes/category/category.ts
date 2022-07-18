import { Router } from 'express'
import { addCategory, deleteCategories, getCategories } from '../../controllers/category/category'

const categoryRouter = Router()

categoryRouter.route('/categories').get(getCategories)
categoryRouter.route('/categories').delete(deleteCategories)
categoryRouter.route('/categories/add').put(addCategory)

export default categoryRouter