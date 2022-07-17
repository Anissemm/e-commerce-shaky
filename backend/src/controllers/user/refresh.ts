import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ClientError } from '../../ErrorHandling/errors'
import User from '../../models/user'
import dotenv from 'dotenv'

dotenv.config()

const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT'

const handleRefreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
        throw new ClientError(401, 'unauthorized')
    }

    const user = await User.findOne({ refreshToken })

    if (!user) {
        throw new ClientError(403, 'invalid-refresh-token')
    }


    const refreshSecret = process.env.REFRESH_TOKEN_SECRET as string
    const accessSecret = process.env.ACCESS_TOKEN_SECRET as string

    jwt.verify(refreshToken, refreshSecret, (err: any, decode: any) => {
        if (err || decode.name !== user.name) {
            throw new ClientError(403, 'invalid-refresh-token')
        }
        const accessToken = jwt.sign({
            sub: decode.id,
            name: decode.name,
            email: decode.email,
            role: decode.role
        }, accessSecret, { expiresIn: DEVELOPMENT ? '5s' : '30m' })

        return res.status(200).json({ message: 'token-refreshed', accessToken, success: true })
    })
}

export default handleRefreshToken