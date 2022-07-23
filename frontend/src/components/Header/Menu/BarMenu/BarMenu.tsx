import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useResizeObserver } from '../../../../hooks/useResizeObserver'
import { useGetHeaderMenuQuery } from '../../../../store/slices/menuSlice'
import BackgroundOverlay from '../../../BackgroundOverlay'
import { menuMotionVariants } from '../menuMotionVariants'
import Chevron from '../../../../assets/svg/icons/arrow_cross_animated'
import './menuBar.css'
import { eventFrom } from 'event-from'
import { flushSync } from 'react-dom'
import e from 'cors'

const BarMenu = () => {
  const { data } = useGetHeaderMenuQuery()
  const [showMenu, setShowMenu] = useState<any[]>([])
  const [menuBarHeight, setMenuBarHeight] = useState(0)
  const [depth0ItemHovered, setDepth0ItemHovered] = useState(false)
  const [currentHeadItemShown, setCurrentHeadItemShown] = useState<null | any>(null)
  const subMenuWrapperRef = useRef<null | HTMLDivElement>(null)
  const [setMenuBarRef, menuBarDimensions] = useResizeObserver()

  useEffect(() => {
    if (menuBarDimensions?.borderBoxSize) {
      const { blockSize } = menuBarDimensions?.borderBoxSize[0]

      setMenuBarHeight(blockSize)
    }
  }, [menuBarDimensions])

  const showSubMenu = (item: any) => {
    setDepth0ItemHovered(true)
    setCurrentHeadItemShown(item)

    setShowMenu(prev => {
      const clone = prev.slice()
      clone.push(item.itemSlug)
      return clone
    })
  }

  const hideSubMenu = () => {
    setDepth0ItemHovered(false)
    setShowMenu(prev => {
      const clone = prev.slice()
      clone.pop()
      return clone
    })
  }

  const toggleSubMenu = (item: any) => {
    if (depth0ItemHovered) {
      setDepth0ItemHovered(false)
      setShowMenu(prev => {
        const clone = prev.slice()
        clone.pop()
        return clone
      })
    } else {
      setDepth0ItemHovered(true)
      setCurrentHeadItemShown(item)

      setShowMenu(prev => {
        const clone = prev.slice()
        clone.push(item.itemSlug)
        return clone
      })
    }
  }

  useEffect(() => {
    console.log(depth0ItemHovered, showMenu, currentHeadItemShown)
  }, [depth0ItemHovered, showMenu, currentHeadItemShown])

  useEffect(() => {
    const handler = (e: any) => {
      if (eventFrom(e) === 'touch') {
        console.log(e.target.closest(`header`), e.target)
      }
    }

    document.addEventListener('click', handler)

    return () => { document.removeEventListener('click', handler) }
  }, [])

  const mountMenuBarItems = (data: any) => {
    const dataItems = data?.children
    let items: any[] = []

    if (dataItems?.length > 0) {
      items = dataItems.map((item: any) => {

        if (item.depth > 2) return null

        const depth0 = item.depth === 0
        const depth1 = item.depth === 1
        const depth2 = item.depth === 2

        const productLink = item.itemType === 'Category' ? `/products/categories/${item.itemSlug}` :
          `/products/tags/${item.itemSlug}` // to verfiy later

        const link = item.postsType === 'page' ? `/${item.itemSlug}` :
          item.postsType === 'blog' ? `/blog/${item.itemSlug}` :
            item.postsType === 'external' ? `${item?.url}` :
              productLink

        if (item.children?.length > 0 && depth0) {

          return (
            <li
              id={`id-${item._id}`}
              data-parent-item-with-children
              key={item._id}
              onPointerEnter={(e: any) => {
                if (e.pointerType === 'mouse') {
                  showSubMenu(item)
                }

              }}
              onPointerLeave={(e: any) => {
                if (e.pointerType === 'mouse') {
                  hideSubMenu()
                }
              }}
              className={`menubar-item font-[Oswald] flex-grow-0 ${currentHeadItemShown?._id === item?._id ? 'z-10' : ''}
               ${depth0 ? 'hover:shadow-[0_0_5px_#000]' : ''}`}>
              <Link
                onClick={(e: any) => {
                  if (eventFrom(e.nativeEvent) === 'touch') {

                    if (showMenu[0] !== item.itemSlug) {
                      hideSubMenu()
                      showSubMenu(item)
                    } else {
                      hideSubMenu()
                    }
                    e.preventDefault()
                  }
                }}
                className={`inline-block relative z-10 transition-all px-4 py-3 duration-300 ${depth0ItemHovered && currentHeadItemShown._id == item._id ? 'bg-melony-clay' : ''}`}
                to={link}
                title={item.value}
              >
                {item.value}
              </Link>
              <div
                data-sub-bar-wrapper
                ref={subMenuWrapperRef}
                onClick={(e: any) => {
                  if (e.target === e.currentTarget) {
                    hideSubMenu()
                  }
                }}
                style={{ top: depth0 ? menuBarHeight : undefined }}
                className={`${depth0 ? 'w-full fixed left-0 right-0 flex justify-center items-start' : ''}`}>
                <AnimatePresence>
                  {showMenu[item.depth] === item.itemSlug &&
                    <motion.div
                      className={` ${depth0 ? 'menubar-sub-list relative bg-melony-clay w-full flex flex-start items-start max-w-[1440px] overflow-hidden shadow-[0_0_5px_#000] mx-auto p-5 pb-12' : ''}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onPointerOver={() => { setDepth0ItemHovered(true) }}
                      onPointerLeave={(e: any) => {

                        const subBarWrapper = e?.relatedTarget?.dataset?.subBarWrapper === 'true'
                        if (subBarWrapper) {
                          hideSubMenu()
                        }
                      }}
                    >
                      <ul className='flex flex-col flex-wrap justify-start items-start h-full max-h-[350px]' >
                        {mountMenuBarItems(item)}
                      </ul>
                      {depth0 && <div className='absolute bottom-0 left-0 right-0 w-full bg-ebony-clay shadow-[0_0_5px_#000]'>
                        <Link to={link} className='w-full flex items-center transtion-all duration-300 justify-end h-full py-2 px-3 hover:-translate-x-2'>
                          All {item.value}
                          <Chevron className='rotate-180 h-3 transtion-all duration-300' double />
                        </Link>
                      </div>}

                    </motion.div>}
                  {showMenu[item.depth] !== item.itemSlug &&
                    <motion.div
                      className={`hidden`}
                    >
                      <ul className='hidden' >
                        {mountMenuBarItems(item)}
                      </ul>
                      {depth0 && <div className='hidden'>
                        <a href={link} className='hidden'>
                          All {item.value}
                          <Chevron className='hidden' double />
                        </a>
                      </div>}

                    </motion.div>}
                </AnimatePresence>
              </div>
            </li >
          )
        }

        if (item.depth === 1 && item.children.length > 0) {
          return <li key={item._id} className={`flex-grow-0 pl-6 
          ${depth1 ? 'pb-4 font-[Oswald]' :
              depth2 ? 'font-[\'Roboto_Condensed\']' : ''}`}>
            <Link
              className={`inline-block transition duration-300 ease-[cubic-bezier(.36,.07,.19,.97)]
                ${depth1 ? 'leading-none py-1 w-full truncate hover:translate-x-1 ' :
                  depth0 ? 'py-3 px-4' : depth2 ? 'capitalize hover:text-opacity-50 hover:translate-x-1' : ''}`}
              to={link}
              title={item.value}
            >
              {item.value}
            </Link>
            <ul className='pl-2'>
              {mountMenuBarItems(item)}
            </ul>
          </li>
        }

        if (item.itemType === 'Custom_Link') {
          return (
            <li className={`menubar-item ${depth0 ? 'font-[Oswald] hover:bg-melony-clay hover:shadow-[0_0_5px_#000]' :
              depth1 ? 'font-[Oswald] h-10 pl-6 pb-4' :
                depth2 ? 'font-[\'Roboto_Condensed\']' :
                  ''}`}
              key={item._id}>
              <a
                className={`inline-block transition duration-300 ease-[cubic-bezier(.36,.07,.19,.97)]
                  ${depth1 ? 'leading-none w-full truncate hover:translate-x-1' :
                    depth0 ? 'py-3 px-4' : depth2 ? '!font-[\'Roboto_Condensed\'] capitalize hover:text-opacity-50 hover:translate-x-1' : ''}`}
                href={link}
                title={item.value}
              >{item.value}</a>
            </li>
          )
        }

        return (
          <li className={`menubar-item 
          ${depth0 ? 'font-[Oswald] hover:bg-melony-clay hover:shadow-[0_0_5px_#000]' :
              depth1 ? 'font-[Oswald] h-10 pl-6 pb-4' :
                depth2 ? 'font-[\'Roboto_Condensed\']' :
                  ''}`}
            key={item._id}
          >
            <Link
              className={`inline-block transition duration-300 ease-[cubic-bezier(.36,.07,.19,.97)]
                ${depth1 ? 'leading-none w-full truncate hover:translate-x-1' :
                  depth0 ? 'py-3 px-4' : depth2 ? '!font-[\'Roboto_Condensed\'] capitalize hover:text-opacity-50 hover:translate-x-1' : ''}`}
              to={link}
              title={item.value}
            >
              {item.value}
            </Link>
          </li>
        )
      })

    }
    return items
  }

  const showBackground = depth0ItemHovered && currentHeadItemShown?.children.length > 0

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
      <ul className={`flex uppercase items-center z-[51] justify-start w-full max-w-[1440px] mx-auto px-4`}>
        {mountMenuBarItems(data?.menu)}
      </ul>
      <AnimatePresence>
        {showBackground && <BackgroundOverlay onClick={() => { hideSubMenu() }} toggleBackgroundBlur={showBackground} duration={0.3} />}
      </AnimatePresence>

    </motion.div>
  )
}

export default BarMenu