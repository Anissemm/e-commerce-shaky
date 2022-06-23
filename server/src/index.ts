import express from 'express'
import { startServer } from './config/connect'
import 'dotenv/config'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

startServer()

export default app