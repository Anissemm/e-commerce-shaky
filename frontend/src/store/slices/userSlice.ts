import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import apiSlice from '../api/apiSlice'
import decodeAccessToken from "../../utils/decodeAccessToken"
import { isEmpty } from 'lodash'

type UserSlice = {
    email?: null | string
    id?: null | string
    name?: null | string
    avatarUrl?: null | string
}

type User = {
    email: string
    id: string
    name: string
    avatarUrl: string
}

const initialState: UserSlice = {}

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

const userApiSlice = apiSlice.injectEndpoints({
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
        signOut: builder.mutation<ResponseType, string>({
            query: (id) => ({
                url: 'v1/signout',
                method: 'PATCH',
                body: { id }
            })
        }),
        // not implemented yet
        //resend verifyEmail
        verifyEmail: builder.mutation<ResponseType & { user: Omit<User, 'avatarUrl'> }, string>({
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
        setUser(state, action: PayloadAction<string>) {
            const decodedPayload = decodeAccessToken(action.payload)
            console.log(decodedPayload)
            if (decodedPayload) {
                const { sub: id, name, email, avatar } = decodedPayload
                state.id = id
                state.name = name
                state.email = email
                state.avatarUrl = avatar
            }
        },
        signOut() {
            return initialState
        }
    }
})

export default userSlice.reducer

export const { setUser, signOut } = userSlice.actions

export const getUserId = (state: RootState): string | null => {
    if (state.user?.id) {
        return state.user.id
    }
    return null
}

export const getUser = (state: RootState): User | null => {
    if (!isEmpty(state.user)) {
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
    useLazyMockProtectedQuery,
    useSignOutMutation } = userApiSlice