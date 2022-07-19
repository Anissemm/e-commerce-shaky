import { AnimatePresence, motion } from 'framer-motion'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useAppDispatch, toggleSideNav, getSidenavShow, useAppSelector, getModalShow } from '../../../store'
import { menuMotionVariants } from './menuMotionVariants'
import BackgroundOverlay from '../../BackgroundOverlay'
import { PropsWithChildren } from 'react'
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

    const closeSideNav = () => {
        dispatch(toggleSideNav(false))
    }

    const mountMenu = (data: any) => {
        const dataItems = data?.children
        if (dataItems?.length > 0) {
            const items: any[] = dataItems.map((item: any) => {
                const productLink = item.itemType === 'category' ? `/products/categories/${item.itemSlug}` :
                                    item.itemType === 'Tag' ? `/products/tags/${item.itemSlug}` :
                                    `${item?.reference?.url}` // to verfiy later

                const link = item.postsType === 'page' ? `/${item.itemSlug}` :
                    item.postsType === 'blog' ? `/blog/${item.itemSlug}` :
                        productLink

                if (item.children?.length > 0) {
                    return (
                        <li key={item._id}>
                            <span><a onClick={(e: any) => {
                                e.preventDefault()
                            }}
                                href={link}>
                                {item.value}
                            </a></span>
                            <ul>
                                {mountMenu(item)}
                            </ul>
                        </li>
                    )
                }

                if (item.itemType === 'Custom_Link') {
                    return (
                        <li key={item._id}>
                            <a href={item?.reference?.url}>{item.value}</a>
                        </li>
                    )
                }

                return (
                    <li key={item._id}>
                        <Link
                            onClick={(e: any) => {
                                closeSideNav()
                            }}
                            to='https://www.google.com'>
                            {item.value}</Link>
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

export default SidenavMenu