import express, { Request, Response } from 'express'
import { startServer } from './config/startServer'
import cors from 'cors'
// import 'dotenv/config'
import 'express-async-errors'
import errorHandler from './ErrorHandling/errorHandler'
import HostBaseUrlMiddleware from './middlewares/HostBaseUrlMiddleware'
import cookieParser from 'cookie-parser'
import isAuthenticated from './middlewares/isAuthenticated'
import corsConfig from './config/corsConfig'
import credentials from './middlewares/credentials'
import productRouter from './routes/product/product'
import userRouter from './routes/user/user'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(credentials)
app.use(cors(corsConfig))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(HostBaseUrlMiddleware)

app.use('/api/v1', userRouter)
app.use('/api/v1', productRouter)

/* authenticated routes */
app.get('/api/v1/protected', isAuthenticated, (req, res) => {
    res.json('protected')
})

/* 404 */
app.use((req: Request, res: Response) => {
    res.status(404).json({ msg: 'page-not-found', success: false })
})

app.use(errorHandler)

startServer()

export default app
