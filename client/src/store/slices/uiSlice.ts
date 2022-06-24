import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { type RootState } from '../store'
interface uiSliceInitialState {
    theme: string
    menuType: string
    isSidenavShown: boolean
}

const initialState: uiSliceInitialState = {
    theme: 'dark',
    menuType: 'sidenav',
    isSidenavShown: false
}


const uiSlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setMenuType(state, action: PayloadAction<string>) {
            state.menuType = action.payload
        },
        toggleSideNav(state, action: PayloadAction<boolean | undefined>) {
            if (typeof action.payload === 'boolean') {
                console.log(action.payload)
                state.isSidenavShown = action.payload
            } else {
                state.isSidenavShown = !state.isSidenavShown
            }


        }
    }

})

export default uiSlice.reducer
export const { setMenuType, toggleSideNav } = uiSlice.actions

export const getMenuType = (state: RootState) => state.UI.menuType
export const getSidenavShow = (state: RootState) => state.UI.isSidenavShown