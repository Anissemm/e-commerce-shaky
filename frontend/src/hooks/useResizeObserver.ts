import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

type ResizeEntry = ResizeObserverEntry | null
type ResizeObserverHook = () => [(ref: HTMLElement | null) => void, ResizeEntry]

export const useResizeObserver: ResizeObserverHook = () => {
    const [entry, setEntry] = useState<ResizeEntry>(null)
    const [targetRef, setTargetRef] = useState<Element | null>(null)

    const resizeObserver = useRef<ResizeObserver | null>(null)

    const unobserve = useCallback(() => {
        if (resizeObserver.current && targetRef) {
            resizeObserver.current.unobserve(targetRef)
        }
    }, [targetRef])

    const observe = useCallback(() => {
        if (targetRef) {
            resizeObserver.current = new ResizeObserver((entry: ResizeObserverEntry[]) => {
                setEntry(entry[0])
            })
            resizeObserver.current.observe(targetRef)
        }
    }, [targetRef])

    useLayoutEffect(() => {
        observe();
        return () => unobserve();
    }, [unobserve, observe])


    return [setTargetRef, entry]
}
