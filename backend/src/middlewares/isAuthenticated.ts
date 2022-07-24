import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ClientError, ServerError } from '../ErrorHandling/errors'
import dotenv from 'dotenv'
import User from '../models/user'
import fetch from 'node-fetch'

dotenv.config()

declare module 'express-serve-static-core' {
    interface Request {
        user: string
    }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const tokenType = req.headers['token-type']

    if (!authHeader) res.status(401).json({ message: 'unauthorized', success: false })

    const token = typeof authHeader === 'string' && authHeader.split(' ')[1]
    
    if (tokenType === 'credentials') {
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

    if (tokenType === 'yandex') {
        const userInfoParams = new URLSearchParams({
            format: 'json'
        })

        const userInfoResp = await fetch(`https://login.yandex.ru/info?${userInfoParams.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `OAuth ${token}`
            }
        })

        const userInfo = await userInfoResp.json() as any


        if (!userInfo) {
            throw new ClientError(403, 'invalid-access-token')
        }

        const user = await User.findOne({ email: userInfo.default_email })

        if (!user) {
            throw new ClientError(403, 'invalid-access-token')
        }

        req.user = user.id
        next()
    }

}

export default isAuthenticated