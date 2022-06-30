import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface InitialValues {
    [key: string]: string[]
}

const initialState: InitialValues = {}

const searchFiltersSlice = createSlice({
    name: 'searchFilters',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<{ filterName: string, value: string }>) {
            console.log(action.payload)
            if (state.hasOwnProperty(action.payload.filterName)) {
                state[action.payload.filterName].push(action.payload.value)
            } else {
                state[action.payload.filterName] = [action.payload.value]
            }
        },
        removeFilter(state, action: PayloadAction<{ filterName: string, value: string }>) {
            if (state.hasOwnProperty(action.payload.filterName)) {
                state[action.payload.filterName] = state[action.payload.filterName].filter(item => item !== action.payload.value)
            }
        },
        resetFilters(state) {
            console.log(state)
            return initialState
        }
    }
})

export const { setFilter, removeFilter, resetFilters } = searchFiltersSlice.actions
export default searchFiltersSlice.reducer

export const getFilters = (state: RootState) => state.searchFilters
export const getFilter = (state: RootState, filterName: string) => {
    if (state.searchFilters.hasOwnProperty(filterName)) {
       return state.searchFilters[filterName]
    }
    return null
}