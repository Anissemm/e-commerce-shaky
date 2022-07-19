import { AnimatePresence, motion } from 'framer-motion'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useAppDispatch, toggleSideNav, getSidenavShow, useAppSelector, getModalShow } from '../../../store'
import { menuMotionVariants } from './menuMotionVariants'
import BackgroundOverlay from '../../BackgroundOverlay'
import { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetHeaderMenuQuery } from '../../../store/slices/menuSlice'

interface SideNavProps extends PropsWithChildren {
    data: any
}

const SidenavMenu = () => {
    const { data } = useGetHeaderMenuQuery()

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
    })

    const mountMenu = (data: any) => {
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
                        <li key={item._id}>
                            <SideNavLink to={link} preventDefault>{item.value}</SideNavLink>
                            <ul>
                                {mountMenu(item)}
                            </ul>
                        </li>
                    )
                }

                if (item.itemType === 'Custom_Link') {
                    return (
                        <li key={item._id}>
                            <SideNavLink to={item?.url} external >{item.value}</SideNavLink>
                        </li>
                    )
                }

                return (
                    <li key={item._id}>
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
                        ref={sidenavRef}
                        className='!h-[calc(100vh-52px)] bg-ebony-clay z-[45] top-[52px] text-white w-full max-w-[320px] absolute overflow-hidden shadow-xl'
                        variants={menuMotionVariants}
                        custom='sidenav'
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                    >
                        <ul>
                            {mountMenu(data.menu)}
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
            <a
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