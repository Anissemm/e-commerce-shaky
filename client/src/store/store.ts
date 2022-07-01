import { combineReducers, configureStore } from "@reduxjs/toolkit"
import localforage from "localforage"
import uiSlice from './slices/uiSlice'
import searchFiltersSlice from "./slices/searchFiltersSlice"
import SignUpFormSlice from "./slices/SignUpFormSlice"
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
import pageSlice from "./slices/pageSlice"

const mainReducer = combineReducers({
    UI: uiSlice,
    searchFilters: searchFiltersSlice,
    page: pageSlice,
    signUpForm: SignUpFormSlice

})


const config = {
    key: 'root',
    storage: localforage,
    blacklist: ['UI', 'signUpForm.values.password', 'signUpForm.values.passwordRetype']
}

const store = configureStore({
    reducer: persistReducer(config, mainReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'UI/setBackgroundMotionValue'],
            },
        }),
})


export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
export default store