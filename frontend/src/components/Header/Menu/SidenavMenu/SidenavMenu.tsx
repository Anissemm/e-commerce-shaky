import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useAppDispatch, toggleSideNav, getSidenavShow, useAppSelector, getModalShow } from '../../../../store'
import { menuMotionVariants } from '../menuMotionVariants'
import BackgroundOverlay from '../../../BackgroundOverlay'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetHeaderMenuQuery } from '../../../../store/slices/menuSlice'
import './sidenavMenu.css'
import Chevron from '../../../../assets/svg/icons/arrow_cross_animated'
import { useResizeObserver } from '../../../../hooks/useResizeObserver'
import pluralize from 'pluralize'

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

    const showSubMenu = (prev: string[], item: any): string[] => {
        const copy = prev.slice()

        if (copy[copy.length - 1] === item.itemSlug) {
            return copy
        }

        copy.push(item.itemSlug)

        return copy
    }

    const hideSubMenu = (prev: string[]): string[] => {
        const copy = prev.slice()
        copy.pop()
        return copy
    }

    const mountSideNavMenuItems = (data: any) => {
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
                        <li className="sidenav-item flex items-center justify-between" key={item._id}>
                            <SideNavLink
                                to={link}
                                title={item.value}
                                preventDefault
                                onClick={(e) => {
                                    setShowList((prev) => { return showSubMenu(prev, item) })
                                }}
                            >
                                {item.value}
                            </SideNavLink>
                            <Chevron cross={false} className="rotate-180 w-3 transition-all duration-300" />
                            <LayoutGroup id={item.itemSlug}>
                                <AnimatePresence>
                                    {showList.length > 0 && showList[item.depth] === item.itemSlug &&
                                        <motion.div
                                            key={item.itemSlug}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className={`sidenav-sub-list z-[${item.depth + 1}] ${showList[item.depth] === item.itemSlug && !showList[item.depth + 1] ? 'overflow-y-auto' : ''}`}>
                                            <ul className={`mb-auto scrollbar-thin mt-0 pb-6 z-[${item.depth + 1}] ${showList[item.depth] === item.itemSlug && !showList[item.depth + 1] ? 'overflow-y-auto' : ''}`}>
                                                {mountSideNavMenuItems(item)}
                                            </ul>
                                            <div className='sticky flex items-center justify-end bottom-0 px-3 left-0 w-full bg-ebony-clay shadow-[0_0_5px_#000]'>
                                                <Link to={link} className='sidenav-link hover:-translate-x-2'>
                                                    All {item.value}
                                                </Link>
                                                <Chevron className='rotate-180 h-3 transtion-all duration-300' double />
                                            </div>
                                        </motion.div>}
                                </AnimatePresence>
                            </LayoutGroup>
                        </li >
                    )
                }

                if (item.itemType === 'Custom_Link') {
                    return (
                        <li className="sidenav-item" key={item._id}>
                            <SideNavLink to={item?.url} title={item.value} external >{item.value}</SideNavLink>
                        </li>
                    )
                }

                return (
                    <li className="sidenav-item" key={item._id}>
                        <SideNavLink to={link} title={item.value} closeSideNavOnClick >
                            {item.value}
                        </SideNavLink>
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
                {isSidenavShown && <BackgroundOverlay toggleBackgroundBlur={isSidenavShown} zIndex={-1} >
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
                            className='sidenav-button flex items-center px-6 mt-2 mb-3 relative min-h-[50px] duration-[1500ms]'>
                            <motion.button
                                className='absolute transition-all duration-500'
                                style={{
                                    left: showList.length === 0 ? sidenavWidth - 49 : 16
                                }}
                                onClick={(e: any) => {
                                    setShowList(hideSubMenu)
                                    if (showList.length === 0) {
                                        dispatch(toggleSideNav(false))
                                    }
                                    e.stopPropagation()
                                }}>
                                <Chevron className='h-5' cross={showList.length === 0} />
                            </motion.button>
                        </motion.div>
                        <ul className={`relative scrollbar-thin pb-6 h-full mb-auto max-h-[calc(100vh-122px)] z-0 ${showList.length === 0 ? 'overflow-y-auto' : ''}`}>
                            {mountSideNavMenuItems(data.menu)}
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
    title?: string
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
        title,
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
                title={title}
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
                title={title}
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