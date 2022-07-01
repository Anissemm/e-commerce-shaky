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
        setFormValues(state, action: PayloadAction<FormType>) {
            state.values = action.payload
        }
    }
})

export const { setFormValues } = signUpFormSlice.actions
export default signUpFormSlice.reducer

export const getSignUpFormValues = (state: RootState) => state.signUpForm.values