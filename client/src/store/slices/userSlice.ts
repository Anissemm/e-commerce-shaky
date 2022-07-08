import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import apiSlice from '../api/apiSlice'
import decodeAccessToken from "../../utils/decodeAccessToken"

interface userSliceType {
    token: null | string
    email: null | string
    id: null | string
    name: null | string
}

type User = {
    email: string
    id: string
    name: string
}

const initialState: userSliceType = {
    token: null,
    email: null,
    id: null,
    name: null
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

type ResponseType = {
    message: string
    success: boolean
}

const userAuthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation<ResponseType & { accessToken: string }, SignInCredentials>({
            query: (credentials) => ({
                url: 'v1/signin',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        signUp: builder.mutation<ResponseType, SignUpCredentials>({
            query: (credentials) => ({
                url: 'v1/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        // not implemented yet
        //resend verifyEmail
        verifyEmail: builder.mutation<ResponseType & { user: User }, string>({
            query: (verifyKey) => ({
                url: 'v1/verifyEmail',
                method: 'POST',
                body: { verifyKey }
            })

        }),
        sendResetEmail: builder.mutation<ResponseType, string>({
            query: (email) => ({
                url: 'v1/resetPassword/send',
                method: 'POST',
                body: { email }
            })
        }),
        verifyResetToken: builder.mutation<ResponseType & { resetToken: string }, string>({
            query: (token) => ({
                url: 'v1/resetPassword/verifyToken',
                method: 'POST',
                body: { resetToken: token }
            })
        }),
        resetPassword: builder.mutation<ResponseType, NewPasswordWithToken>({
            query: (resetCredentials) => ({
                url: 'v1/resetPassword/reset',
                method: 'POST',
                body: { ...resetCredentials }
            })
        }),
        mockProtected: builder.query<any, void>({
            query: () => 'v1/protected'
        })
    })
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<string>) {
            const decodedPayload = decodeAccessToken(action.payload)
            if (decodedPayload) {
                const { sub: id, name, email } = decodedPayload
                state.id = id
                state.email = email
                state.name = name
            }
            state.token = action.payload
        },
        signOut(state) {
            state.id = null
            state.email = null
            state.name = null
            state.token = null
        }
    }
})

export default userSlice.reducer

export const { setCredentials, signOut } = userSlice.actions

export const getUserId = (state: RootState) => {
    if (state.user.token) {
        return state.user.id
    }
    return null
}

export const getUser = (state: RootState) => {
    if (state.user.token) {
        return state.user
    }
    return null
}

export const {
    useSignInMutation,
    useSignUpMutation,
    useVerifyEmailMutation,
    useVerifyResetTokenMutation,
    useResetPasswordMutation,
    useSendResetEmailMutation,
    useLazyMockProtectedQuery } = userAuthSlice