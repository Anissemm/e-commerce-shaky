import { Router } from 'express'
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../../controllers/product/product'
import { setRate, deleteRate } from '../../controllers/product/rate'
import { setReview, deleteReview, getReview, getReviews } from '../../controllers/product/review'

const productRouter = Router()

productRouter.route('/product/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
productRouter.route('/products').get(getProducts)
productRouter.route('/product/new').post(addProduct)

productRouter.route('/product/:productId/reviews').get(getReviews)
productRouter.route('/product/:productId/review/:userId').put(setReview).get(getReview).delete(deleteReview)

productRouter.route('/product/:productId/rate/:userId').put(setRate)
productRouter.route('/product/:productId/rate/:userId').delete(deleteRate)

productRouter.route('/')
export default productRouter