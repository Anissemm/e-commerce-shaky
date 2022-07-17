import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import User from "../../models/user"

const SignOut = async (req: Request, res: Response) => {
    const { id } = req.body

    if (!id) {
        throw new ClientError(400, 'invalid-user-id')
    }

    const user = await User.findByIdAndUpdate(id, { refreshToken: null })

    if (!user) {
        throw new ClientError(404, 'user-not-found')
    }

    return res.status(200).json({ message: 'signed-out', success: true })
}

export default SignOut