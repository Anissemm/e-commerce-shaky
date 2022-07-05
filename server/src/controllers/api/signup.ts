import { Request, Response } from "express"
import { ClientError } from "../../ErrorHandling/errors"
import User from "../../models/user"
import { sendVerificationMail } from "../../utils/utilityMails"

// to implement on front end
export const signUp = async (req: Request, res: Response) => {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        throw new ClientError(400, 'missing-credentials')
    }

    const user = await User.findOne({ email })

    if (user) {
        throw new ClientError(409, 'email-conflict')
    }

    await User.create({ email, name, password })

    await sendVerificationMail({ email, hostUrl: req.baseHostUrl })

    res.status(201).json({ message: 'user-created', success: true, })
}
