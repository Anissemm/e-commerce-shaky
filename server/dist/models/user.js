import mongoose from "mongoose";
const verifyEmailSchema = new mongoose.Schema({
    emailVerifKey: String,
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: { updatedAt: true, createdAt: false } });
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    emailVerification: verifyEmailSchema,
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: 'image',
    }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
