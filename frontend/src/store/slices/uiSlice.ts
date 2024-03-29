import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MotionValue, motionValue } from "framer-motion"
import { type RootState } from '../store'

interface uiSliceState {
    theme: string
    menuType: string
    isSidenavShown: boolean
    isModalShown: boolean
    currentShownModalId: string
    searchResultHeight: undefined | null | number
    backgroundMotionValue: number
    isSearchFiltersShown: boolean
    currentModalId: string | undefined | null
    headerZIndex: number
    screenBreakpoint: null | string
}

const initialState: uiSliceState = {
    theme: 'dark',
    menuType: 'sidenav',
    isSidenavShown: false,
    isModalShown: false,
    currentModalId: null,
    isSearchFiltersShown: false,
    currentShownModalId: '',
    searchResultHeight: undefined,
    backgroundMotionValue: 0,
    headerZIndex: 49,
    screenBreakpoint: null
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
        toggleModal(state, action: PayloadAction<{ show?: boolean | undefined, modalId?: string | undefined | null } | undefined>) {
            if (action?.payload?.modalId) {
                state.currentModalId = action.payload.modalId
            }

            if (typeof action?.payload?.show === 'boolean') {
                state.isModalShown = action.payload.show
            } else {
                state.isModalShown = !state.isModalShown
            }
        },

        setShownModalId(state, action: PayloadAction<string>) {
            state.currentShownModalId = action.payload
        },
        setSearchResultheight(state, action: PayloadAction<number | undefined | null>) {
            state.searchResultHeight = action.payload
        },
        setBackgroundMotionValue(state, action: PayloadAction<number>) {
            state.backgroundMotionValue = action.payload
        },
        toggleSearchFilters(state, action: PayloadAction<boolean | undefined>) {
            if (typeof action.payload === 'boolean') {
                state.isSearchFiltersShown = action.payload
            } else {
                state.isSearchFiltersShown = !state.isSearchFiltersShown
            }
        },
        setHeaderZIndex(state, action: PayloadAction<number>) {
            state.headerZIndex = action.payload
        },
        setScreenSizeBreakpoint(state, action: PayloadAction<string | null>) {
            state.screenBreakpoint = action.payload
        }
    }

})

export default uiSlice.reducer
export const {
    setMenuType,
    toggleSideNav,
    toggleModal,
    toggleSearchFilters,
    setSearchResultheight,
    setShownModalId,
    setBackgroundMotionValue,
    setScreenSizeBreakpoint,
    setHeaderZIndex } = uiSlice.actions

export const getMenuType = (state: RootState) => state.UI.menuType
export const getSidenavShow = (state: RootState) => state.UI.isSidenavShown
export const getModalShow = (state: RootState) => state.UI.isModalShown
export const getModalCurrentId = (state: RootState) => state.UI.currentModalId
export const getSearchFiltersShow = (state: RootState) => state.UI.isSearchFiltersShown
export const getSearchResultHeight = (state: RootState) => state.UI.searchResultHeight
export const getCurrentShownModalId = (state: RootState) => state.UI.currentShownModalId
export const getBackgroundMotionValue = (state: RootState) => state.UI.backgroundMotionValue
export const getHeaderZIndex = (state: RootState) => state.UI.headerZIndex
export const getScreenBreakpoint = (state: RootState) => state.UI.screenBreakpoint