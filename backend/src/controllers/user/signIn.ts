import { Request, Response } from 'express'
import { ClientError, ServerError } from '../../ErrorHandling/errors'
import User from '../../models/user'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { userInfo } from 'os'
import { URLSearchParams } from 'url'
import base64 from 'base-64'

const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT' && true

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ClientError(400, 'missing-credentials')
    }

    const user = await User.findOne({ email, authTypes: { $elemMatch: { $eq: 'credentials' } } })

    if (!user) {
        throw new ClientError(401, 'wrong-credentials')
    }

    const { success: isPwdsMatch } = await user.comparePasswords(password)

    if (isPwdsMatch) {
        console.log(isPwdsMatch)
        const generatedTokens = await user.generateAccessTokensPair()
        if (!generatedTokens.success) {
            throw new ServerError(500, generatedTokens.message)
        }

        user.authenticatedWith = 'credentials'
        await user.save()

        const [accessToken, refreshToken] = generatedTokens.tokens

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: DEVELOPMENT ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 14
        })

        return res.status(200).json({ message: 'authenticated', success: true, accessToken })
    } else {
        throw new ClientError(401, 'wrong-credentials')
    }
}

export const signInWtihYandex = async (req: Request, res: Response) => {
    const { code } = req.body

    if (!code) {
        throw new ClientError(401, 'missing-auth-code')
    }

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code
    })

    const response = await fetch(`https://oauth.yandex.ru/token`, {
        method: 'POST',
        body: params,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64.encode(`${process.env.YANDEX_AUTH_CLIENT_ID}:${process.env.YANDEX_AUTH_SECRET_ID}`)}`
        }
    })

    const data = await response.json() as any

    if (data.error) {
        throw new ServerError(500, `${data.error}: ${data.error_description}`)
    }

    res.cookie('refreshToken', data?.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: DEVELOPMENT ? 'none' : 'strict',
        maxAge: 1000 * (typeof data?.expires_in === 'number' ? data?.expires_in : 60 * 60 * 24 * 14)
    })

    const userInfoParams = new URLSearchParams({
        format: 'json'
    })

    const userInfoResp = await fetch(`https://login.yandex.ru/info?${userInfoParams.toString()}`, {
        method: 'GET',
        headers: {
            'Authorization': `OAuth ${data.access_token}`
        }
    })

    const userInfo = await userInfoResp.json() as any

    if (!userInfo) {
        throw new ServerError(500, 'missing-yandex-user-info')
    }

    let user = await User.findOneAndUpdate({ email: userInfo.default_email, authTypes: { $elemMatch: { $in: ['yandex-oAuth', 'credentials'] } } },
        { $addToSet: { authTypes: 'yandex-oAuth' }, refreshToken: data?.refresh_token },
        { upsert: true, new: true })

    if (!user.name) {
        user.name = userInfo.real_name
    }

    user.authenticatedWith = 'yandex-oAuth'
    await user.save()

    return res.status(200).json({ success: true, message: 'successful', data: { token: data.access_token, email: user.email, name: user.name, id: user.id, avatarUrl: user.profileImage } })
}