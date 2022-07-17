import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import store, { type RootState } from './store'

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch 