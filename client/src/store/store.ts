import { combineReducers, configureStore } from "@reduxjs/toolkit"
import localforage from "localforage"
import uiSlice from './slices/uiSlice'
import searchFiltersSlice from "./slices/searchFiltersSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"

const mainReducer = combineReducers({
    UI: uiSlice,
    searchFilters: searchFiltersSlice
})


const config = {
    key: 'root',
    storage: localforage,
    blacklist: ['UI']
}

const store = configureStore({
    reducer: persistReducer(config, mainReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'UI/setBackgroundMotionValue'],
                ignoredPaths: ['UI.backgroundMotionValue']
            },
        }),
})


export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
export default store