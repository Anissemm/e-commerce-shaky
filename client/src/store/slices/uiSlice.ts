import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MotionValue, motionValue } from "framer-motion"
import { type RootState } from '../store'

interface uiSliceState {
    theme: string
    menuType: string
    isSidenavShown: boolean
    isModalShown: boolean
    backgroundMotionValue: MotionValue<number>
}

const initialState: uiSliceState = {
    theme: 'dark',
    menuType: 'sidenav',
    isSidenavShown: false,
    isModalShown: false,
    backgroundMotionValue: motionValue(0)
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
                state.isSidenavShown = action.payload
            } else {
                state.isSidenavShown = !state.isSidenavShown
            }
        },
        toggleModal(state, action: PayloadAction<boolean | undefined>) {
            if (typeof action.payload === 'boolean') {
                state.isModalShown = action.payload
            } else {
                state.isModalShown = !state.isModalShown
            }
        },
        setBackgroundMotionValue(state, action: PayloadAction<MotionValue<number>>) {
            state.backgroundMotionValue = action.payload
        }
    }

})

export default uiSlice.reducer
export const { setMenuType, toggleSideNav, toggleModal, setBackgroundMotionValue } = uiSlice.actions

export const getMenuType = (state: RootState) => state.UI.menuType
export const getSidenavShow = (state: RootState) => state.UI.isSidenavShown
export const getModalShow = (state: RootState) => state.UI.isModalShown
export const getBackgroundMotionValue = (state: RootState) => state.UI.backgroundMotionValue