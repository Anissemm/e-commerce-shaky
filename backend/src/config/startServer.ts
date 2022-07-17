import app from "../index"
import connectDB from "./connectDB"
import 'express-async-errors'
import dotenv from "dotenv"

dotenv.config()

const PORT: string | number = process.env.PORT || 3001

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })
    } catch (error) {
        console.log(error)
    }
}

export { startServer }
