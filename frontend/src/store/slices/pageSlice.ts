import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface defaultValues {
    currentPageTitle: {
        show: boolean, 
        value: string,
        mount: boolean
    }
}

const initialState: defaultValues = {
    currentPageTitle: {
        show: false,
        mount: true,
        value: ''
    }
}

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setCurrentPageTitle(state, action: PayloadAction<{ value: string, show: boolean, mount?: boolean | undefined | null }>) {
            state.currentPageTitle = { 
                ...state.currentPageTitle,
                value: action.payload.value, 
                show: action.payload.show,
                mount: action.payload.mount === undefined || action.payload.mount === null ? true : action.payload.mount
            }
        }
    }
})

export const getCurrentPageTitle = (state: RootState) => state.page.currentPageTitle

export const { setCurrentPageTitle } = pageSlice.actions
export default pageSlice.reducer
