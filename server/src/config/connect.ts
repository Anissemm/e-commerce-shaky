import mongoose from "mongoose"
import app from ".."
import 'dotenv/config'
import 'express-async-errors'

const PORT: string | number = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI as string

const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('DB connection success!')
        app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })
    } catch (error) {
        console.log(error)
    }
}

export { startServer }
