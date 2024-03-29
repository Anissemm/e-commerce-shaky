import { NextFunction, Request, Response } from "express"
import { whitelistOrigins } from "../config/corsConfig"

// only dev
const credentials = (req: Request, res: Response, next: NextFunction) => {
    const { origin } = req.headers
    if (origin && whitelistOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Allow-Origin', origin)
    }
    
    next()
}

export default credentials