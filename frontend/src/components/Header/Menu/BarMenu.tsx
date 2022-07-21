import { AnimatePresence, motion } from 'framer-motion'
import pluralize from 'pluralize'
import React, { forwardRef, PropsWithChildren, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useResizeObserver } from '../../../hooks/useResizeObserver'
import { useGetHeaderMenuQuery } from '../../../store/slices/menuSlice'
import { menuMotionVariants } from './menuMotionVariants'


const BarMenu = forwardRef<HTMLDivElement, PropsWithChildren>((props, ref) => {
  const { data } = useGetHeaderMenuQuery()
  const [showMenu, setShowMenu] = useState<string[]>([])
  const [menuBarHeight, setMenuBarHeight] = useState(0)

  const [setMenuBarRef, menuBarDimensions] = useResizeObserver()

  useEffect(() => {
    if (menuBarDimensions?.borderBoxSize) {
      const { blockSize } = menuBarDimensions?.borderBoxSize[0]

      setMenuBarHeight(blockSize)
      console.log(blockSize)
    }
  }, [menuBarDimensions])

  const mountMenuBarItems = (data: any) => {
    const dataItems = data?.children

    if (dataItems?.length > 0) {
      const items: any[] = dataItems.map((item: any) => {
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
              onPointerEnter={() => {
                setShowMenu(prev => {
                  const clone = prev.slice()
                  clone.push(item.itemSlug)
                  return clone
                })
              }}
              onPointerLeave={() => {
                setShowMenu(prev => {
                  const clone = prev.slice()
                  clone.pop()
                  return clone
                })
              }}
              className={`menubar-item ${depth0 ? 'hover:bg-melony-clay hover:shadow-[0_0_5px_#000] ' :
                ''}`} key={item._id}>
              <Link
                className={depth0 ? 'py-4 px-2 inline-block' : ''} 
                to={link}
                title={item.value}

              >
                {item.value}
              </Link>
              <div
                style={{ top: depth0 ? menuBarHeight : undefined }}
                className={`${depth0 ? 'w-full fixed left-0 right-0' : ''}`}>
                <AnimatePresence>
                  {showMenu[item.depth] === item.itemSlug &&
                    <motion.div
                      key={item.itemSlug}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`menubar-sub-list ${depth0 ? 'menubar-sub-depth-0' :
                        `menubar-sub-depth-${item.depth}`}`}>
                      <ul className={``}>
                        {mountMenuBarItems(item)}
                      </ul>
                      {/* <div className='sticky flex items-center justify-end bottom-0 px-3 left-0 w-full bg-ebony-clay shadow-[0_0_5px_#000]'>
                        <a href={link} className='sidenav-link hover:-translate-x-2'>
                          All {pluralize(item.value)}
                        </a>
                        <Chevron className='rotate-180 h-3 transtion-all duration-300' double />
                      </div> */}
                    </motion.div>}
                </AnimatePresence>
              </div>
            </li >
          )
        }

        if (item.itemType === 'Custom_Link') {
          return (
            <motion.li className={`menubar-item ${depth0 ? 'hover:bg-melony-clay hover:shadow-[0_0_5px_#000]' : ''}`} key={item._id}>
              <a className={depth0 ? 'py-4 px-2 inline-block' : ''}  href={link} title={item.value}>{item.value}</a>
            </motion.li>
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

      return items
    }

    return null
  }
  return (
    <motion.div
      ref={reference => {
        ref = reference as React.ForwardedRef<HTMLDivElement>
        if (typeof setMenuBarRef === 'function') {
          setMenuBarRef(reference)
        }
      }}

      className='bg-ebony-clay text-white w-full'
      variants={menuMotionVariants}
      custom='sidenav'
      initial={false}
      animate='visible'
      exit='hidden'
      {...props}
    >
      <ul className='flex items-center justify-start'>
        {mountMenuBarItems(data?.menu)}
      </ul>
    </motion.div>
  )
})

export default motion(BarMenu)