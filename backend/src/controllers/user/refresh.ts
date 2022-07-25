import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ClientError, ServerError } from '../../ErrorHandling/errors'
import User from '../../models/user'
import base64 from 'base-64'
import fetch from 'node-fetch'

const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT'

const handleRefreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
        throw new ClientError(401, 'unauthorized')
    }

    const user = await User.findOne({ refreshToken })

    if (!user) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: DEVELOPMENT ? 'none' : 'strict',
            maxAge: Date.now()
        })

        throw new ClientError(403, 'invalid-refresh-token')
    }

    if (user.authenticatedWith === 'credentials') {

        const refreshSecret = process.env.REFRESH_TOKEN_SECRET as string
        const accessSecret = process.env.ACCESS_TOKEN_SECRET as string

        jwt.verify(refreshToken, refreshSecret, (err: any, decode: any) => {
            if (err || user.id !== decode.sub) {
                throw new ClientError(403, 'invalid-refresh-token')
            }

            const newRefreshToken: string = jwt.sign({
                sub: user.id,
            }, refreshSecret, { expiresIn: '14d' })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: DEVELOPMENT ? 'none' : 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 14
            })

            const accessToken = jwt.sign({
                sub: user.id,
                avatar: user.profileImage,
                name: user.name,
                email: user.email,
                role: user.role
            }, accessSecret, { expiresIn: '30m' })

            return res.status(200).json({ message: 'token-refreshed', accessToken, success: true })
        })
    }

    if (user.authenticatedWith === 'yandex-oAuth') {
        const refreshedParams = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })

        const refreshedResp = await fetch(`https://oauth.yandex.ru/token`, {
            method: 'POST',
            body: refreshedParams,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${base64.encode(`${process.env.YANDEX_AUTH_CLIENT_ID}:${process.env.YANDEX_AUTH_SECRET_ID}`)}`
            }
        })

        const refreshedTokenObj = await refreshedResp.json() as any

        if (refreshedTokenObj?.error) {
            throw new ServerError(500, `${refreshToken.error}: ${refreshedTokenObj.error_description}`)
        }

        user.refreshToken = refreshedTokenObj.refresh_token
        await user.save()

        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: DEVELOPMENT ? 'none' : 'strict',
            maxAge: 1000 * (typeof refreshedTokenObj?.expires_in === 'number' ? refreshedTokenObj?.expires_in : 60 * 60 * 24 * 14)
        })

        return res.status(200).json({
            success: true,
            message: 'token-refreshed',
            accessToken: refreshedTokenObj.access_token,
            userInfo: {
                email: user.email,
                id: user.id,
                name: user.name,
                avatarUrl: user.profileImage
            }
        })
    }
}

export default handleRefreshToken