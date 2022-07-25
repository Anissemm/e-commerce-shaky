import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import User from "../../models/user"
import { sendVerificationMail } from "../../utils/utilityMails"
import bcrypt from 'bcrypt'

// to implement on front end
export const signUp = async (req: Request, res: Response) => {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        throw new ClientError(400, 'missing-credentials')
    }

    const user = await User.findOne({ email })

    if (user && user?.authTypes.includes('credentials')) {
        throw new ClientError(409, 'email-conflict')
    }

    if (user) {
        const hashedPassword = await bcrypt.hash(password, 10)
        await user.updateOne({ email, name, password: hashedPassword, $push: { authTypes: 'credentials' } })

    } else {
        await User.create({ email, name, password, authTypes: ['credentials'] })
    }

    await sendVerificationMail({ email, hostUrl: req.baseHostUrl })

    res.status(201).json({ message: 'user-created', success: true, })
}
