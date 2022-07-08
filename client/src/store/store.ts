import { combineReducers, configureStore } from "@reduxjs/toolkit"
import localforage from "localforage"
import uiSlice from './slices/uiSlice'
import searchFiltersSlice from "./slices/searchFiltersSlice"
import SignUpFormSlice from "./slices/signUpFormSlice"
import apiSlice from "./api/apiSlice"
import userSlice from "./slices/userSlice"
import pageSlice from "./slices/pageSlice"
import SignInformSlice from "./slices/signInFormSlice"

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
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice,
    UI: uiSlice,
    searchFilters: searchFiltersSlice,
    page: pageSlice,
    signUpForm: SignUpFormSlice,
    signInForm: SignInformSlice

})


const config = {
    key: 'root',
    storage: localforage,
    blacklist: [
        'UI',
        apiSlice.reducerPath
    ]
}

const store = configureStore({
    reducer: persistReducer(config, mainReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'UI/setBackgroundMotionValue'],
            },
        }).concat(apiSlice.middleware),
    devTools: true
})


export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
export default store