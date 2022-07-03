import mongoose from "mongoose"

interface UserDoc {
    email: string
    emailVerification: VerifyEmailObj
    password: string
    name: string
    profileImage?: string
}

interface VerifyEmailObj {
    emailVerifKey: string | undefined
    isVerified: boolean
    updatedAt: Date
}

const verifyEmailSchema = new mongoose.Schema<VerifyEmailObj>({
    emailVerifKey: String,
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: { updatedAt: true, createdAt: false } })

const userSchema = new mongoose.Schema<UserDoc>({
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
}, { timestamps: true })

export default mongoose.model('User', userSchema)

