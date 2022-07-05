import express from 'express'
import { startServer } from './config/connect'
import cors from 'cors'
import 'dotenv/config'
import 'express-async-errors'
import errorHandler from './ErrorHandling/errorHandler'
import signInRouter from './routes/signin'
import signUpRouter from './routes/signup'
import HostBaseUrlMiddleware from './middlewares/HostBaseUrlMiddleware'
import cookieParser from 'cookie-parser'
import isAuthenticated from './middlewares/isAuthenticated'
import refreshTokenRouter from './routes/refresh'
import verifyMailRouter from './routes/verificationEmail'
import passwordResetRouter from './routes/resetPassword'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(HostBaseUrlMiddleware)

app.use('/api/v1', signUpRouter)
app.use('/api/v1', verifyMailRouter)
app.use('/api/v1', passwordResetRouter)
app.use('/api/v1', signInRouter)
app.use('/api/v1', refreshTokenRouter)

app.use(isAuthenticated)
/* authenticated routes */

app.get('/api/v1/protected', (req, res) => {
    res.json('Hello app!')
})

app.use(errorHandler)

startServer()

export default app
