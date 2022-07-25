import { useEffect } from "react"
import { useAppDispatch, setCurrentPageTitle } from "../store"

export const usePageSetTitle = (title: string, show: boolean, mount?: boolean) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCurrentPageTitle({value: title, show, mount}))
    }, [])
}