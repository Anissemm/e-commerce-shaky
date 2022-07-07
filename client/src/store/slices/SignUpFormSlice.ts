import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FormType {
    email?: string
    name?: string
}

const initialState: { values: FormType } = {
    values: {
        email: '',
        name: '',
    }
}

const signUpFormSlice = createSlice({
    name: 'signUpForm',
    initialState,
    reducers: {
        setSignUpFormValues(state, action: PayloadAction<FormType>) {
            state.values = action.payload
        },
        clearSignUpFormValues(state) {
            state.values = {}
        }
    }
})

export const { setSignUpFormValues, clearSignUpFormValues } = signUpFormSlice.actions
export default signUpFormSlice.reducer

export const getSignUpFormValues = (state: RootState) => state.signUpForm.values