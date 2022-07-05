import bcrypt from 'bcrypt';
import { ClientError } from "../ErrorHandling/errors.js";
import User from "../models/user.js";
import { getMessageTemplate, transporter } from "../utils/emailTransporter.js";
import getDirname from "../utils/getDirname.js";
import { resolve } from 'path';
import { randomBytes, } from 'crypto';
const __DIRNAME = getDirname(import.meta.url);
export const signInController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ClientError(400, 'Missing credentials');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new ClientError(409, 'No user with such email address');
    }
    if (!user.emailVerification.isVerified) {
        throw new ClientError(403, 'email verification needed');
    }
};
const sendVerificationMail = async ({ email, name, hostUrl, id }) => {
    const emailVerifKey = randomBytes(32).toString('hex');
    await User.findByIdAndUpdate(id, { emailVerification: { emailVerifKey } });
    const verificationLink = `${hostUrl}/api/v1/verifyEmail?verifyCode=${`${id}.${randomBytes(32).toString('hex')}`}`;
    const message = await getMessageTemplate({
        email,
        name,
        dirname: resolve(__DIRNAME, '../templates/VerificationMail.ejs'),
        providedProps: {
            company: 'Shaky Website',
            name: name,
            link: verificationLink
        }
    });
    return await transporter.sendMail(message);
};
export const signUpController = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        throw new ClientError(400, 'Missing credentials');
    }
    const user = await User.findOne({ email });
    if (user) {
        throw new ClientError(409, 'A user with such email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const created = await User.create({ email, name, password: hashedPassword });
    await sendVerificationMail({ email, name, hostUrl: req.baseHostUrl, id: created._id });
    res.status(201).json({ message: 'User created', success: true, });
};
export const VerifyMailController = async (req, res) => {
    const { verifyKey } = req.query;
    if (verifyKey) {
        const [id, emailVerifKey] = verifyKey.split('.');
        const user = await User.findById(id).select('emailVerification');
        if (!user) {
            throw new ClientError(404, 'No such user or invalid verification key');
        }
        if (user.emailVerification.isVerified) {
            return res.status(200).json({ message: 'already verified', success: true });
        }
        const { updatedAt } = user.emailVerification;
        const isKeyOutdated = Date.now() > (new Date(updatedAt).getTime() + 1000 * 60 * 60 * 12);
        if (isKeyOutdated) {
            throw new ClientError(400, 'verification key is outdated');
        }
        const { emailVerifKey: storedKey } = user.emailVerification;
        if (storedKey !== emailVerifKey) {
            throw new ClientError(400, 'invalid verification key');
            //Resend key or redirect ot other api
        }
        user.emailVerification.isVerified = true;
        user.emailVerification.emailVerifKey = undefined;
        await user.save();
        return res.status(200).json({ message: 'email verified', success: true });
    }
};