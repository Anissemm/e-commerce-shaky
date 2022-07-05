import { randomBytes } from "crypto"
import { Types } from "mongoose"
import { SentMessageInfo } from "nodemailer"
import { resolve } from "path"
import { ClientError } from "../ErrorHandling/errors"
import User from "../models/user"
import { getMessageTemplate, transporter } from "./emailTransporter"
import getAbsoluteDirname from "./getDirname"

interface verificationMailParams {
    email: string
    hostUrl: string
}

type VerificationMail = {
    (params: verificationMailParams): Promise<SentMessageInfo>
}

const __DIRNAME = getAbsoluteDirname(import.meta.url)
const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT'

export const sendVerificationMail: VerificationMail = async ({ email, hostUrl }) => {
    hostUrl = DEVELOPMENT ? 'http://localhost:3000' : hostUrl

    const emailVerifKey = randomBytes(20).toString('hex')
    const user = await User.findOneAndUpdate({ email }, { emailVerification: { emailVerifKey, expiresIn: new Date(Date.now() + 1000 * 60 * 60) } }, { new: true })

    if (!user) {
        throw new ClientError(404, 'no user with such email address')
    }
    const verificationLink = `${hostUrl}/account/verifyEmail?verifyCode=${`${user.id}.${randomBytes(20).toString('hex')}`}`

    const message = await getMessageTemplate({
        email,
        name: user.name,
        dirname: resolve(__DIRNAME, '../templates/VerificationMail.ejs'),
        providedProps: {
            company: 'Shaky Website',
            name: user.name,
            link: verificationLink
        }
    })

    return await transporter.sendMail(message)
}

interface PasswrodResetParams {
    email: string
    hostUrl: string
}

interface PasswordResetMail {
    (props: PasswrodResetParams): Promise<SentMessageInfo>
}

export const sendResetPasswordMail: PasswordResetMail = async ({ email, hostUrl }) => {
    hostUrl = DEVELOPMENT ? 'http://localhost:3000' : hostUrl

    const user = await User.findOne({ email })

    if (!user) {
        throw new ClientError(400, 'no user with such email address')
    }

    const resetKey = randomBytes(20).toString()

    if (user?.passwordReset) {
        user.passwordReset.resetKey = resetKey
        user.passwordReset.expiresIn = new Date(Date.now() + 1000 * 60 * 60)
        await user.save()
    }

    const resetPasswordLink = `${hostUrl}/account/resetPassword?resetKey=${`${user.id}.${resetKey}}`}`

    const message = await getMessageTemplate({
        email,
        name: user.name,
        dirname: resolve(__DIRNAME, '../templates/resetPassword.ejs'),
        providedProps: {
            company: 'Shaky Website',
            name: user.name,
            link: resetPasswordLink
        }
    })

    return await transporter.sendMail(message)
}