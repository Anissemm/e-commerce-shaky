import { useLayoutEffect } from "react"
import { setMenuType, useAppDispatch } from "../store"
import { useResizeObserver } from "./useResizeObserver"

interface useMenuResponsive {
    (): [(ref: HTMLElement | null) => void]
}

export const useMenuResponsive: useMenuResponsive = () => {
    const dispatch = useAppDispatch()
    const [setTargetRef, entry] = useResizeObserver()

    useLayoutEffect(() => {
        console.log(entry)
        if (entry?.borderBoxSize) {
            const { inlineSize } = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize
            if (inlineSize < 1024) {
                dispatch(setMenuType('sidenav'))
            } else {
                dispatch(setMenuType('bar'))
            }
        }
    }, [entry])

    return [setTargetRef]
}