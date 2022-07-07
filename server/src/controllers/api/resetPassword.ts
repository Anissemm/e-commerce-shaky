import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import User from "../../models/user"
import { sendResetPasswordMail } from "../../utils/utilityMails"

export const sendResetPasswordToken = async (req: Request, res: Response) => {
    const { email } = req.body

    if (!email) {
        throw new ClientError(400, 'missing-email')
    }

    const passwordResetMailInfo = await sendResetPasswordMail({ email, hostUrl: req.baseHostUrl })
    return res.status(200).json({ message: 'reset-mail-sent', success: true, info: passwordResetMailInfo })
}


export const verifyResetPasswordToken = async (req: Request, res: Response) => {
    const { resetToken } = req.body

    if (resetToken) {
        const [id, resetKey] = (resetToken as string).split('.')
        const user = await User.findById(id).select('passwordReset')

        if (!user) {
            throw new ClientError(400, 'invalid-reset-token')
        }

        const { expiresIn } = user.passwordReset
        const isKeyOutdated = Date.now() > new Date(expiresIn as Date).getTime()
        const { resetKey: storedKey } = user.passwordReset!

        if (isKeyOutdated || storedKey !== resetKey) {
            throw new ClientError(400, 'invalid-reset-token')
        }

        return res.status(200).json({ message: 'valid-reset-token', success: true, resetToken })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const { newPassword, resetToken } = req.body
    console.log(resetToken)
    if (resetToken) {
        const [id, _resetKey] = (resetToken as string).split('.')
        const user = await User.findById(id)

        console.log(user)
        if (!user) {
            throw new ClientError(400, 'invalid-reset-token')
        }

        user.password = newPassword
        user.passwordReset.remove()
        await user.save()

        return res.status(200).json({ message: 'passsword-reset-success', success: true })
    }
}