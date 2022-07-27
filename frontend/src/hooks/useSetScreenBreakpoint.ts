import React, { useEffect } from 'react'
import { setScreenSizeBreakpoint, useAppDispatch } from '../store'
import { useResizeObserver } from './useResizeObserver'

const useSetScreenBreakpoint = () => {
    const [setResizeRef, mainContainerDimensions] = useResizeObserver()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (mainContainerDimensions?.borderBoxSize) {
            const { inlineSize } = mainContainerDimensions?.borderBoxSize[0]
            let breakpoint = null

            if (inlineSize < 350) {
                breakpoint = null
            } else if (inlineSize >= 350 && inlineSize < 510) {
                breakpoint = 'sxs'
            } else if (inlineSize >= 510 && inlineSize < 690) {
                breakpoint = 'xs'
            } else if (inlineSize >= 690 && inlineSize < 768) {
                breakpoint = 'sm'
            } else if (inlineSize >= 768 && inlineSize < 1024) {
                breakpoint = 'md'
            } else if (inlineSize >= 1024 && inlineSize < 1280) {
                breakpoint = 'lg'
            } else if (inlineSize >= 1280 && inlineSize < 1536) {
                breakpoint = 'xl'
            } else {
                breakpoint = '2xl'
            }

            dispatch(setScreenSizeBreakpoint(breakpoint))
        }
    }, [mainContainerDimensions])

    return setResizeRef
}

export default useSetScreenBreakpoint