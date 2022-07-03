import express from 'express'
import { startServer } from './config/connect'
import cors from 'cors'
import 'dotenv/config'
import 'express-async-errors'
import errorHandler from './ErrorHandling/errorHandler'
import authRouter from './routes/auth'
import HostBaseUrlMiddleware from './middlewares/HostBaseUrlMiddleware'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(HostBaseUrlMiddleware)

app.get('/', (req, res) => {
    res.json('Hello app!')
})

app.use('/api/v1', authRouter)

app.use(errorHandler)

startServer()

export default app
