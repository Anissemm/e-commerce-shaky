import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { setItem } from 'localforage'
import pluralize from 'pluralize'
import React, { ForwardedRef, forwardRef, Fragment, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useResizeObserver } from '../../../hooks/useResizeObserver'
import { setHeaderZIndex, useAppDispatch } from '../../../store'
import { useGetHeaderMenuQuery } from '../../../store/slices/menuSlice'
import BackgroundOverlay from '../../BackgroundOverlay'
import { menuMotionVariants } from './menuMotionVariants'

const BarMenu = () => {
  const { data } = useGetHeaderMenuQuery()
  const [showMenu, setShowMenu] = useState<string[]>([])
  const [menuBarHeight, setMenuBarHeight] = useState(0)
  const [depth0ItemHovered, setDepth0ItemHovered] = useState(false)
  const [currentItemHovered, setCurrentItemHovered] = useState<null | any>(null)
  const subMenuWrapperRef = useRef<null | HTMLDivElement>(null)
  const [setMenuBarRef, menuBarDimensions] = useResizeObserver()

  useEffect(() => {
    if (menuBarDimensions?.borderBoxSize) {
      const { blockSize } = menuBarDimensions?.borderBoxSize[0]

      setMenuBarHeight(blockSize)
      console.log(blockSize)
    }
  }, [menuBarDimensions])

  const showSubMenu = (item: any, depth0: boolean) => {
    if (depth0) {
      setDepth0ItemHovered(true)
    }
    setShowMenu(prev => {
      const clone = prev.slice()
      clone.push(item.itemSlug)
      return clone
    })
    setCurrentItemHovered(item)
  }

  const hideSubMenu = (depth0: boolean) => {
    if (depth0) {
      setDepth0ItemHovered(false)
    }
    setShowMenu(prev => {
      const clone = prev.slice()
      clone.pop()
      return clone
    })
  }

  const mountMenuBarItems = (data: any) => {
    const dataItems = data?.children
    let items: any[] = []

    if (dataItems?.length > 0) {
      items = dataItems.map((item: any) => {
        const depth0 = item.depth === 0

        const productLink = item.itemType === 'Category' ? `/products/categories/${item.itemSlug}` :
          `/products/tags/${item.itemSlug}` // to verfiy later

        const link = item.postsType === 'page' ? `/${item.itemSlug}` :
          item.postsType === 'blog' ? `/blog/${item.itemSlug}` :
            item.postsType === 'external' ? `${item?.url}` :
              productLink

        if (item.children?.length > 0) {

          return (
            <li
              key={item._id}
              onPointerEnter={() => { showSubMenu(item, depth0) }}
              onPointerLeave={() => { hideSubMenu(item) }}
              className={`menubar-item ${depth0ItemHovered ? 'z-10' : 'bg-ebony-clay -z-[1]'} ${depth0 ? 'menubar-item-depth-0 hover:shadow-[0_0_5px_#000]' :
                ''}`}>
              <Link
                className={`${depth0ItemHovered ? 'bg-melony-clay' : 'bg-ebony-clay'} ${depth0 ? `py-4 px-2 relative inline-block z-10 transition-all duration-300` : ''}`}
                to={link}
                title={item.value}
              >
                {item.value}
              </Link>
              <div
                data-sub-bar-wrapper
                ref={subMenuWrapperRef}
                style={{ top: depth0 ? menuBarHeight : undefined }}
                className={`${depth0 ? 'w-full fixed left-0 right-0 flex justify-center items-start' : undefined}`}>
                <AnimatePresence key={item.itemSlug + item.depth}>
                  {showMenu[item.depth] === item.itemSlug &&
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onPointerLeave={(e: any) => {
                        const { subBarWrapper } = e.relatedTarget?.dataset
                        if (subBarWrapper === 'true') {
                          hideSubMenu(depth0)
                        }
                      }}
                      className={`menubar-sub-list relative ${depth0 ? 'bg-melony-clay w-full max-w-[1440px] shadow-[0_0_5px_#000] mx-auto' :
                        `menubar-sub-depth-${item.depth}`} px-7 pt-5 pb-12`}>
                      <ul>
                        {mountMenuBarItems(item)}
                      </ul>
                      {depth0 && <div className='absolute bottom-0 left-0 right-0 flex items-center justify-end px-3 w-full bg-ebony-clay shadow-[0_0_5px_#000]'>
                        <a href={link} className='sidenav-link hover:-translate-x-2'>
                          All {pluralize(item.value)}
                        </a>
                        {/* <Chevron className='rotate-180 h-3 transtion-all duration-300' double /> */}
                      </div>}
                    </motion.div>}
                </AnimatePresence>

              </div>
            </li >
          )
        }

        if (item.itemType === 'Custom_Link') {
          return (
            <li className={`menubar-item ${depth0 ? 'hover:bg-melony-clay hover:shadow-[0_0_5px_#000]' : ''}`} key={item._id}>
              <a className={depth0 ? 'py-4 px-2 inline-block' : ''} href={link} title={item.value}>{item.value}</a>
            </li>
          )
        }

        return (
          <li className={`menubar-item ${depth0 ? 'hover:bg-melony-clay hover:shadow-[0_0_5px_#000]' : ''}`} key={item._id}>
            <Link className={depth0 ? 'py-4 px-2 inline-block' : ''} to={link} title={item.value} >
              {item.value}
            </Link>
          </li>
        )
      })

    }
    return items
  }

  return (
    <motion.div
      ref={reference => {
        if (typeof setMenuBarRef === 'function') {
          setMenuBarRef(reference)
        }
      }}

      className='bg-ebony-clay text-white w-full flex items-center justify-center shadow-[0_0_5px_#000]'
      variants={menuMotionVariants}
      custom='sidenav'
      initial={false}
      animate='visible'
      exit='hidden'
    >
      <ul key={'askfklaj;lkdf'} className={`flex items-center z-[51] justify-start w-full max-w-[1440px] mx-auto`}>
        {mountMenuBarItems(data?.menu)}
      </ul>
      <AnimatePresence>
        {depth0ItemHovered && currentItemHovered?.children.length > 0 && <BackgroundOverlay />}
      </AnimatePresence>

    </motion.div>
  )
}

export default BarMenu