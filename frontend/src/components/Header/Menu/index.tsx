import BarMenu from './BarMenu/BarMenu'
import SidenavMenu from './SidenavMenu/SidenavMenu'
import { getMenuType, useAppSelector } from '../../../store'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

const Menu = () => {
  const menuType: 'sidenav' | 'bar' = useAppSelector(getMenuType)

  const menu = useMemo(() => {
    return menuType === 'sidenav' ?
      <SidenavMenu /> :
      menuType === 'bar' ? <BarMenu /> :
        null
  }, [menuType])

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <nav>
          {menu}
        </nav>
      </AnimatePresence>
    </>
  )
}

export default Menu
