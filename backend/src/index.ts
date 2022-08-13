import express, { Request, Response } from 'express'
import { startServer } from './config/startServer'
import cors from 'cors'
import dotenv from 'dotenv'
import 'express-async-errors'
import errorHandler from './ErrorHandling/errorHandler'
import HostBaseUrlMiddleware from './middlewares/HostBaseUrlMiddleware'
import cookieParser from 'cookie-parser'
import isAuthenticated from './middlewares/isAuthenticated'
import corsConfig from './config/corsConfig'
import credentials from './middlewares/credentials'
import productRouter from './routes/product/product'
import userRouter from './routes/user/user'
import menuRouter from './routes/menu/menu'
import categoryRouter from './routes/category/category'
import tagRouter from './routes/tags/tags'

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
app.use('/api/v1', menuRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', tagRouter)

/* authenticated routes */
app.get('/api/v1/protected', isAuthenticated, (req, res) => {
    res.json('protected')
})

/* anything else */
app.use((req: Request, res: Response) => {
    if (req.method !== 'GET') {
       return res.status(404).json({ msg: 'the querried url doesn\'t exist', success: false })
    }
    return res.sendStatus(200)
})

app.use(errorHandler)

startServer()

export default app
