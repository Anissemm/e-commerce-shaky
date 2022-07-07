import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FormType {
    email?: string
}

const initialState: { values: FormType } = {
    values: {
        email: '',
    }
}

const signInFormSlice = createSlice({
    name: 'signInForm',
    initialState,
    reducers: {
        setSignInFormValues(state, action: PayloadAction<FormType>) {
            state.values = action.payload
        }
    }
})

export const { setSignInFormValues } = signInFormSlice.actions
export default signInFormSlice.reducer

export const getSignInFormValues = (state: RootState) => state.signInForm.values