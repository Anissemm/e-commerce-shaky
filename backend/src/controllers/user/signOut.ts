import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import User from "../../models/user"

const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT'

const SignOut = async (req: Request, res: Response) => {
    const { id } = req.body

    if (!id) {
        throw new ClientError(400, 'invalid-user-id')
    }

    const user = await User.findByIdAndUpdate(id, { refreshToken: null, authenticatedWith: null })

    if (!user) {
        throw new ClientError(404, 'user-not-found')
    }

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: DEVELOPMENT ? 'none' : 'strict',
        maxAge: Date.now()
    })

    return res.status(200).json({ message: 'signed-out', success: true })
}

export default SignOut