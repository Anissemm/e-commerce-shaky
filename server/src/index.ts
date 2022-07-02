import express from 'express'
import { startServer } from './config/connect'
import cors from 'cors'
import 'dotenv/config'
import 'express-async-errors'
import errorHandler from './ErrorHandling/errorHandler'
import authRouter from './routes/auth'
import { getMessageTemplate } from './utils/emailTransporter'
import getDirname from './utils/dirname'
import { join } from 'path'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello app!')
})

app.use('/api/v1', authRouter)

console.log(await getMessageTemplate('dima.anissem@gmail.com', 
        'Anissem', 
        join(getDirname(import.meta.url), 'templates', 'VerificationMail.ejs'), 
        { link: "https://www.google.com", company: 'Shaky website', name: 'Anissem' }))

app.use(errorHandler)

startServer()

export default app
