import bcrypt from 'bcrypt';
import { ClientError } from '../ErrorHandling/errors';
import User from '../models/user';
export const signInController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ClientError(400, 'Missing credentials');
    }
    const user = await User.find({ email });
    console.log(user);
    if (!user) {
        throw new ClientError(409, 'No user with such email address');
    }
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
    await User.create({ email, name, password: hashedPassword });
    res.status(201).json({ message: 'User created', success: true });
};
