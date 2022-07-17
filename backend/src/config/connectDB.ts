import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI as string

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('DB connection success!')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB