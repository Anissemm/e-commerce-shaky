import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useAppDispatch, toggleSideNav, getSidenavShow, useAppSelector, getModalShow } from '../../../../store'
import { menuMotionVariants } from '../menuMotionVariants'
import BackgroundOverlay from '../../../BackgroundOverlay'
import { MouseEventHandler, PropsWithChildren, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetHeaderMenuQuery } from '../../../../store/slices/menuSlice'
import './sidenavMenu.css'
import Chevron from '../../../../assets/svg/icons/arrow_cross_animated'
import { useResizeObserver } from '../../../../hooks/useResizeObserver'

interface SideNavProps extends PropsWithChildren {
    data: any
}

const SidenavMenu = () => {
    const { data } = useGetHeaderMenuQuery()
    const [showList, setShowList] = useState<string[]>([])

    const [setResizeRef, sidenavDimensions] = useResizeObserver()
    const [sidenavWidth, setSidenavWidth] = useState<number>(0)

    const dispatch = useAppDispatch()
    const isSidenavShown: boolean = useAppSelector(getSidenavShow)

    const handleOutsideClick = (e: any) => {
        const sidenavToggle = e.target?.dataset?.sidenavToggle

        if (sidenavToggle === 'true' && e.key !== 'Escape') return
        dispatch(toggleSideNav(false))
    }

    const sidenavRef = useDetectClickOutside({
        onTriggered: handleOutsideClick,
        triggerKeys: ['Escape']
    }) as React.MutableRefObject<null | HTMLDivElement>

    useEffect(() => {
        if (sidenavDimensions?.borderBoxSize) {
            const { inlineSize } = sidenavDimensions?.borderBoxSize[0]
            setSidenavWidth(inlineSize)
        }
    }, [sidenavDimensions])

    const show = (prev: string[], item: any): string[] => {
        const copy = prev.slice()

        if (copy[copy.length - 1] === item.itemSlug) {
            return copy
        }

        copy.push(item.itemSlug)

        return copy
    }

    const hide = (prev: string[]): string[] => {
        const copy = prev.slice()
        copy.pop()
        return copy
    }

    const mountMenuItems = (data: any) => {
        const dataItems = data?.children
        if (dataItems?.length > 0) {
            const items: any[] = dataItems.map((item: any) => {

                const productLink = item.itemType === 'Category' ? `/products/categories/${item.itemSlug}` :
                    `/products/tags/${item.itemSlug}` // to verfiy later

                const link = item.postsType === 'page' ? `/${item.itemSlug}` :
                    item.postsType === 'blog' ? `/blog/${item.itemSlug}` :
                        item.postsType === 'external' ? `${item?.url}` :
                            productLink
                if (item.children?.length > 0) {

                    return (
                        <li className="sidenav-item" key={item._id}>
                            <SideNavLink
                                to={link}
                                preventDefault
                                onClick={(e) => {
                                    setShowList((prev) => { return show(prev, item) })
                                }}
                            >
                                {item.value}
                            </SideNavLink>
                            <LayoutGroup id={item.itemSlug}>
                                <AnimatePresence>
                                    {showList.length > 0 && showList[item.depth] === item.itemSlug &&
                                        <motion.div
                                            key={item.itemSlug}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className='sub-list'>
                                            <ul>
                                                {mountMenuItems(item)}
                                            </ul>
                                        </motion.div>}
                                </AnimatePresence>
                            </LayoutGroup>
                        </li >
                    )
                }

                if (item.itemType === 'Custom_Link') {
                    return (
                        <li className="sidenav-item" key={item._id}>
                            <SideNavLink to={item?.url} external >{item.value}</SideNavLink>
                        </li>
                    )
                }

                return (
                    <li className="sidenav-item" key={item._id}>
                        <SideNavLink to={link} closeSideNavOnClick >{item.value}</SideNavLink>
                    </li>
                )
            })

            return items
        }

        return null
    }

    return (
        <>
            <AnimatePresence>
                {isSidenavShown && <BackgroundOverlay zIndex={-1} >
                    <motion.div
                        ref={(ref) => {
                            sidenavRef.current = ref
                            if (typeof setResizeRef === 'function') {
                                setResizeRef(ref)
                            }
                        }}
                        className='!h-[calc(100vh-52px)] bg-ebony-clay z-[45] top-[52px] text-white w-full max-w-[320px] absolute overflow-hidden shadow-xl'
                        variants={menuMotionVariants}
                        custom='sidenav'
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                    >
                        <motion.div
                            className='px-6 pt-5 pb-1 relative min-h-[50px] duration-[1500ms]'>
                            <motion.button
                                className='absolute transition-all duration-500'
                                style={{
                                    left: showList.length === 0 ? sidenavWidth - 49 : 16
                                }}
                                onClick={(e: any) => {
                                    setShowList(hide)
                                    if (showList.length === 0) {
                                        dispatch(toggleSideNav(false))
                                    }
                                    e.stopPropagation()
                                }}>
                                <Chevron cross={showList.length === 0} />
                            </motion.button>
                        </motion.div>
                        <ul className='relative min-h-[calc(100vh-104px)]'>
                            {mountMenuItems(data.menu)}
                        </ul>
                    </motion.div>
                </BackgroundOverlay>}
            </AnimatePresence>
        </>
    )
}

interface SideNavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    external?: boolean
    to: string
    preventDefault?: boolean
    closeSideNavOnClick?: boolean
}

const linkDefaultProps = {
    external: false,
    to: '#',
    preventDefault: false,
    closeSideNavOnClick: false,
}

const SideNavLink: React.FC<SideNavLinkProps> = (props) => {
    const dispatch = useAppDispatch()

    const {
        external,
        to,
        preventDefault,
        closeSideNavOnClick,
        children,
        onClick
    } = { ...linkDefaultProps, ...props }

    useEffect(() => {
        if (closeSideNavOnClick) {
        }
    }, [closeSideNavOnClick])

    return (
        external || preventDefault ?
            <a className='sidenav-link'
                href={to}
                onClick={(e: any) => {
                    if (preventDefault) {
                        e.preventDefault()
                    }

                    if (onClick) {
                        onClick(e)
                    }

                    if (closeSideNavOnClick) {
                        dispatch(toggleSideNav(false))
                    }

                }}
            >
                {children}
            </a> :
            <Link
                className='sidenav-link'
                to={to}
                onClick={(e: any) => {
                    if (onClick) {
                        onClick(e)
                    }

                    if (closeSideNavOnClick) {
                        dispatch(toggleSideNav(false))
                    }

                }}
            >
                {children}</Link>
    )
}

export default SidenavMenu