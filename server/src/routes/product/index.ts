import { Router } from 'express'
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../../controllers/product/product'
import { getReview, getReviews, updateReview } from '../../controllers/product/review'

const productRouter = Router()

productRouter.route('/product/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
productRouter.route('/products').get(getProducts)
productRouter.route('/products/new').post(addProduct)

productRouter.route('/product/:productId/reviews').get(getReviews)
productRouter.route('/product/:productId/review/:reviewId').delete(getReviews).get(getReview).patch(updateReview)


export default productRouter