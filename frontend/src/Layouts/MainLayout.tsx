import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from '../components/Footer'
import { Helmet } from "react-helmet"
import { getCurrentPageTitle, persistor, setScreenSizeBreakpoint, useAppDispatch, useAppSelector } from "../store"
import { motion } from 'framer-motion'
import { useEffect } from "react"
import { useResizeObserver } from "../hooks/useResizeObserver"
import useSetScreenBreakpoint from "../hooks/useSetScreenBreakpoint"

const Layout = () => {
    const pageTitle = useAppSelector(getCurrentPageTitle)
    const setBreakPointRef = useSetScreenBreakpoint()
    // const [setResizeRef, mainContainerDimensions] = useResizeObserver()
    // const dispatch = useAppDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pageTitle])

    // useEffect(() => {
    //     if (mainContainerDimensions?.borderBoxSize) {
    //         const { inlineSize } = mainContainerDimensions?.borderBoxSize[0]
    //         let breakpoint = null 

    //         if (inlineSize >= 350) {
    //             breakpoint = 'sxs'
    //         } else if (inlineSize >= 510) {
    //             breakpoint = 'xs'
    //         } else if (inlineSize >= 690) {
    //             breakpoint = 'sm'
    //         } else if (inlineSize >= 768) {
    //             breakpoint = 'md'
    //         } else if (inlineSize >= 1024) {
    //             breakpoint = 'lg'
    //         } else if (inlineSize >= 1280) {
    //             breakpoint = 'xl'
    //         } else if (inlineSize >= 1536) {
    //             breakpoint = '2xl'
    //         } else {
    //             breakpoint = null
    //         }

    //         dispatch(setScreenSizeBreakpoint(breakpoint))
    //     }
    // }, [mainContainerDimensions])

    return (
        <>
            <Helmet>
                <title>{pageTitle.value}</title>
            </Helmet>
            <div
                ref={ref => {
                    if (typeof setBreakPointRef === 'function') {
                        setBreakPointRef(ref)
                    }
                }}
                id='main-container' className="mainContainer bg-melony-clay flex flex-col" lang="en">
                <Header />
                <Outlet />
                <Footer className='mt-auto' />
            </div>
        </>
    )
}

export default Layout