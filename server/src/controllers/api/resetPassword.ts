import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import User from "../../models/user"
import { sendResetPasswordMail } from "../../utils/mails"

// to implement on front end
export const sendResetPasswordToken = async (req: Request, res: Response) => {
    const { email } = req.body

    if (!email) {
        throw new ClientError(400, 'email address is required')
    }

    await sendResetPasswordMail({ email, hostUrl: req.baseHostUrl })
}

// to implement on front end
export const verifyPasswordResetToken = async (req: Request, res: Response) => {
    const { resetToken } = req.query

    if (resetToken) {
        const [id, resetKey] = (resetToken as string).split('.')

        const user = await User.findById(id).select('passwordReset')

        if (!user) {
            throw new ClientError(400, 'no user with such id')
        }

        const { expiresIn } = user.passwordReset!
        const isKeyOutdated = Date.now() > new Date(expiresIn as Date).getTime()
        const { resetKey: storedKey } = user.passwordReset!

        if (isKeyOutdated || storedKey !== resetKey) {
            throw new ClientError(400, 'invalid reset token')
            //Resend key or redirect to other api
        }

        return res.status(202).json({ message: 'token is valid', resetToken: storedKey, success: true })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const { newPassword, resetToken } = req.body

    const user = await User.findOne({ passwordReset: { resetKey: resetToken } })

    if (!user) {
        throw new ClientError(404, 'no user found')
    }

    user.password = newPassword
    user.passwordReset = undefined
    await user.save()

    return res.status(200).json({ message: 'password successfully resetted', success: true })
}