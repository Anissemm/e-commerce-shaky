import { randomBytes } from "crypto"
import { SentMessageInfo } from "nodemailer"
import { resolve } from "path"
import { ClientError } from "../ErrorHandling/errors"
import User from "../models/user"
import { getMessageTemplate, transporter } from "./emailTransporter"
import getAbsoluteDirname from "./getDirname"
import dotenv from 'dotenv'

dotenv.config()

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
        throw new ClientError(404, 'user-not-found')
    }

    // to adapt to real link
    const verificationLink = `${hostUrl}/account/email-verification?verifyCode=${`${user.id}.${emailVerifKey}`}`

    const message = await getMessageTemplate({
        email,
        name: user.name,
        senderName: 'Shaky Supplements',
        subject: 'Please verify your email address',
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
    const resetKey = randomBytes(20).toString('hex')
    const user = await User.findOneAndUpdate({ email }, { passwordReset: { resetKey, expiresIn: new Date(Date.now() + 1000 * 60 * 60) } }, { new: true })
    
    if (!user) {
        throw new ClientError(404, 'user-not-found')
    }

    // to implement the real link
    const resetPasswordLink = `${hostUrl}/account/reset-password?resetKey=${`${user.id}.${resetKey}`}`


    const message = await getMessageTemplate({
        email,
        name: user.name,
        senderName: 'Shaky Supplements',
        subject: 'Your password reset link',
        dirname: resolve(__DIRNAME, '../templates/resetPassword.ejs'),
        providedProps: {
            name: user.name,
            link: resetPasswordLink
        }
    })

    return await transporter.sendMail(message)
}