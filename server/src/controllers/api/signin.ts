import { Request, Response } from 'express'
import { ClientError, ServerError } from '../../ErrorHandling/errors'
import User from '../../models/user'

const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT' && true

// to implement on front end
export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ClientError(400, 'email and password are required')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ClientError(401, 'no user with such email address')
    }

    const { success: isPwdsMatch } = await user.comparePasswords(password)

    if (isPwdsMatch) {
        const generatedTokens = await user.generateAccessTokensPair()
        if (!generatedTokens.success) {
            throw new ServerError(500, generatedTokens.message)
        }

        const [accessToken, refreshToken] = generatedTokens.tokens
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: DEVELOPMENT ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24
        })

        return res.status(200).json({ accessToken })
    }
    throw new ClientError(401, 'unauthorized')
}
