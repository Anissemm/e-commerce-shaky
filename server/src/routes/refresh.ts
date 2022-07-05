import { Router } from 'express'
import handleRefreshToken from '../controllers/api/refresh'

const refreshTokenRouter = Router()

refreshTokenRouter.get('/refresh', handleRefreshToken)

export default refreshTokenRouter