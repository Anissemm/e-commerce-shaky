import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import User from "../../models/user"
import { sendVerificationMail } from "../../utils/utilityMails"

// to implement on front end
export const resendVerificationMail = async (req: Request, res: Response) => {
    const { email } = req.body
    if (!email) {
        throw new ClientError(400, 'missing-email')
    }

    const verifEmailInfo = await sendVerificationMail({ email, hostUrl: req.baseHostUrl })

    return res.status(200).json({ message: 'verification-email-sent', success: true, info: verifEmailInfo })
}

// to implement on front end
export const verifyMail = async (req: Request, res: Response) => {
    const { verifyKey } = req.body

    if (verifyKey) {
        const [id, emailVerifKey] = (verifyKey as string).split('.')
        const user = await User.findById(id).select('emailVerification name email')

        if (!user) {
            throw new ClientError(400, 'no-user-found')
        }

        if (user.emailVerification.isVerified) {
            return res.status(200).json({
                message: 'already-verified',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                success: true
            })
        }

        const { expiresIn } = user.emailVerification
        const isKeyOutdated = Date.now() > new Date(expiresIn as Date).getTime()
        const { emailVerifKey: storedKey } = user.emailVerification

        console.log('matches: ', storedKey !== emailVerifKey)
        console.log('verify: ', emailVerifKey)
        console.log('stored: ', storedKey)

        if (isKeyOutdated || storedKey !== emailVerifKey) {
            throw new ClientError(400, 'invalid-verification-key')
            //Resend key or redirect to other api
        }

        user.emailVerification.isVerified = true
        user.emailVerification.emailVerifKey = undefined
        user.emailVerification.expiresIn = undefined
        await user.save()

        return res.status(200).json({
            message: 'email-verified',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            success: true
        })
    }


}