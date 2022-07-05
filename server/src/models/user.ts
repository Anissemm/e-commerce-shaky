import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { ServerError } from "../ErrorHandling/errors"
import { randomBytes } from "crypto"

const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT' && true

interface UserDoc extends mongoose.Document {
    email: string
    emailVerification: VerifyEmailObj
    password: string
    name: string
    accessRight: number
    refreshToken: string
    passwordReset: {
        resetKey: string,
        expiresIn: Date | undefined
    } | undefined,
    get role(): string
    set role(role: string)
    profileImage?: string
    comparePasswords: (this: UserDoc, password: string) => Promise<comparePasswordsResponse>
    generateAccessTokensPair: (this: UserDoc) => Promise<GenerateTokensResponse>
    generatePasswordResetToken: (this: UserDoc) => string

}

interface VerifyEmailObj {
    emailVerifKey: string | undefined
    isVerified: boolean
    expiresIn: Date | undefined
}

const verifyEmailSchema = new mongoose.Schema<VerifyEmailObj>({
    emailVerifKey: String,
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    expiresIn: Date
}, { _id: false })

interface comparePasswordsResponse {
    msg?: string
    success: boolean
}

type accessToken = string
type refreshToken = string

interface GenerateTokensResponse {
    success: boolean,
    message: string,
    tokens: [accessToken, refreshToken] | []
}

const userSchema = new mongoose.Schema<UserDoc>({
    email: {
        type: String,
        required: true
    },
    refreshToken: String,
    accessRight: {
        type: Number,
        default: 3
    },
    passwordReset: {
        type: Map,
        resetKey: String,
        expiresIn: Date
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
}, {
    timestamps: true,
    methods: {
        comparePasswords: async function (password) {
            try {
                const compared = await bcrypt.compare(password, this.password)
                return { success: compared }
            } catch (err: any) {
                throw new ServerError(500, 'something went wrong when comparing passwords')
            }
        },
        generateAccessTokensPair: async function () {
            const accessSecret = process.env.ACCESS_TOKEN_SECRET as string
            const refreshSecret = process.env.REFRESH_TOKEN_SECRET as string

            if (!accessSecret && !refreshSecret) {
                throw new ServerError(500, 'missing access secret or refresh secret')
            }

            const accessToken: string = jwt.sign({
                sub: this._id,
                name: this.name,
                email: this.email,
                admin: this.role === 'admin'
            }, accessSecret, { expiresIn: DEVELOPMENT ? '30s' : '30m' })

            const refreshToken: string = jwt.sign({
                sub: this._id,
                name: this.name,
                email: this.email,
                admin: this.role === 'admin'
            }, refreshSecret, { expiresIn: DEVELOPMENT ? '1m' : '12h' })

            try {
                this.refreshToken = refreshToken
                await this.save()
            } catch (error) {
                throw new ServerError(500, 'database on save error')
            }
            return { success: true, message: 'successful', tokens: [accessToken, refreshToken] }
        }
    }
})

userSchema.pre('save', async function (this: UserDoc, next) {
    try {
        if (!this.isModified('password')) next()
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next
    } catch (err: any) {
        next(err)
    }
})

userSchema.virtual('role')
    .get(function () {
        switch (this.accessRight) {
            case 1:
                return 'admin'
            case 2:
                return 'agent'
            case 3:
                return 'client'
        }
    }).set(function (role) {
        switch (role) {
            case 'admin':
                this.accessRight = 1
                break
            case 'agent':
                this.accessRight = 2
                break
            case 'client':
                this.accessRight = 3
        }
    })

const User = mongoose.model<UserDoc>('User', userSchema)

export default User