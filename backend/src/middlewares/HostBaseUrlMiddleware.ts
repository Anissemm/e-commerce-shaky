import { NextFunction, Request, Response } from "express"

declare module 'express-serve-static-core' {
    interface Request {
        baseHostUrl: string
    }
}

const HostBaseUrlMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.baseHostUrl = `${req.protocol}://${req.get('host')}`
    next()
}

export default HostBaseUrlMiddleware