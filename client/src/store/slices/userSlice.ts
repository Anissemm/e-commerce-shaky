import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import apiSlice from '../api/apiSlice'
import { StringLiteralLike } from "typescript"

interface userSliceType {
    token: null | string
    id: null | string
}

const initialState: userSliceType = {
    token: null,
    id: null
}

type SignInCredentials = {
    email: string,
    password: string
}

type SignUpCredentials = {
    email: string,
    password: String,
    name: string
}

type NewPasswordWithToken = {
    newPassword: string,
    resetToken: string
}

const userAuthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query: (credentials: SignInCredentials) => ({
                url: 'v1/signin',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        signUp: builder.mutation({
            query: (credentials: SignUpCredentials) => ({
                url: 'v1/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        verifyEmail: builder.mutation({
            query: (verifyKey: string) => ({
                url: 'v1/verifyEmail',
                method: 'POST',
                body: { verifyKey }
            })

        }),
        sendResetEmail: builder.mutation({
            query: (email: string) => ({
                url: 'v1/resetPassword/send',
                method: 'POST',
                body: { email }
            })
        }),
        verifyResetToken: builder.mutation({
            query: (token: string) => ({
                url: 'v1/resetPassword/verifyToken',
                method: 'POST',
                body: { resetToken: token }
            })
        }),
        resetPassword: builder.mutation({
            query: (resetCredentials: NewPasswordWithToken) => ({
                url: 'v1/resetPassword/reset',
                method: 'POST',
                body: { ...resetCredentials }
            })
        })
    })
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ id: string, token: string }>) {
            state.id = action.payload.id
            state.token = action.payload.token
        },
        signOut(state) {
            state.id = null
            state.token = null
        }
    }
})

export default userSlice.reducer

export const { setCredentials, signOut } = userSlice.actions

export const getUserId = (state: RootState) => state.user.id
export const getUserToken = (state: RootState) => state.user.token
export const {
    useSignInMutation,
    useSignUpMutation,
    useVerifyEmailMutation,
    useVerifyResetTokenMutation,
    useResetPasswordMutation,
    useSendResetEmailMutation } = userAuthSlice