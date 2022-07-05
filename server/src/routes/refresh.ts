import { Router } from 'express'

const refreshTokenRouter = Router()

refreshTokenRouter.get('/refresh', refreshTokenRouter)

export default refreshTokenRouter