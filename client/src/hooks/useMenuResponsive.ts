import { useCallback, useLayoutEffect } from "react"
import { getMenuType, setMenuType, useAppDispatch, useAppSelector } from "../store"
import { useResizeObserver } from "./useResizeObserver"

interface useMenuResponsive {
    (): [(ref: HTMLElement | null) => void]
}

export const useMenuResponsive: useMenuResponsive = () => {
    const dispatch = useAppDispatch()
    const menuType = useAppSelector(getMenuType)
    const [setTargetRef, entry] = useResizeObserver()

    useLayoutEffect(() => {
        if (entry?.borderBoxSize) {
            const { inlineSize } = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize
            if (inlineSize < 1024 && menuType === 'sidenav') {
                return
            } else if (inlineSize < 1024 && menuType === 'bar') {
                dispatch(setMenuType('sidenav'))
            } else if (inlineSize >= 1024 && menuType === 'bar') {
                return
            } else {
                dispatch(setMenuType('bar'))
            }
        }
    }, [entry])

    return [setTargetRef]
}