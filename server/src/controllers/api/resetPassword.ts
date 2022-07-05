import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import User from "../../models/user"
import { sendResetPasswordMail } from "../../utils/utilityMails"

// to implement on front end
export const sendResetPasswordToken = async (req: Request, res: Response) => {
    const { email } = req.body

    if (!email) {
        throw new ClientError(400, 'missing-email')
    }

    const passwordResetMailInfo = await sendResetPasswordMail({ email, hostUrl: req.baseHostUrl })
    return res.status(200).json({ message: 'reset-mail-sent', success: true, info: passwordResetMailInfo })
}

// to implement on front end
export const verifyTokenAndResetPassword = async (req: Request, res: Response) => {
    const { resetToken, newPassword } = req.body

    if (resetToken) {
        const [id, resetKey] = (resetToken as string).split('.')
        const user = await User.findById(id).select('passwordReset')
        if (!user) {
            throw new ClientError(400, 'invalid-reset-token')
        }

        const { expiresIn } = user.passwordReset
        console.log(expiresIn)
        const isKeyOutdated = Date.now() > new Date(expiresIn as Date).getTime()
        const { resetKey: storedKey } = user.passwordReset!

        if (isKeyOutdated || storedKey !== resetKey) {
            throw new ClientError(400, 'invalid-reset-token')
            //Resend key or redirect to other api
        }

        user.password = newPassword
        user.passwordReset = undefined!
        await user.save()

        return res.status(201).json({ message: 'password-reset-successful', success: true })
    }
}

// export const resetPassword = async (req: Request, res: Response) => {
//     const { newPassword, resetToken } = req.body

//     const user = await User.findOne({ passwordReset: { resetKey: resetToken } })

//     if (!user) {
//         throw new ClientError(404, 'no user found')
//     }

//     user.password = newPassword
//     user.passwordReset.remove()
//     await user.save()

//     return res.status(200).json({ message: 'password successfully reset', success: true })
// }