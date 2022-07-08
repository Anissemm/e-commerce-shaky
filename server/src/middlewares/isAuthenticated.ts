import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ClientError } from '../ErrorHandling/errors'

declare module 'express-serve-static-core' {
    interface Request {
        user: string
    }
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) res.status(401).json({ message: 'unauthorized', success: false })

    const token = typeof authHeader === 'string' && authHeader.split(' ')[1]
    const accessSecret = process.env.ACCESS_TOKEN_SECRET as string

    if (token && accessSecret) {
        jwt.verify(token, accessSecret, (err, decoded) => {
            if (err || !decoded) {
                throw new ClientError(403, 'invalid-access-token')
            }

            if (decoded) {
                req.user = decoded.sub as string
                next()
            }
        })
    }

}

export default isAuthenticated