import { combineReducers, configureStore } from "@reduxjs/toolkit"
import localforage from "localforage"
import uiSlice from './slices/uiSlice'
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
    UI: uiSlice
})


const config = {
    key: 'root',
    storage: localforage,
}

const store = configureStore({
    reducer: persistReducer(config, mainReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
export default store