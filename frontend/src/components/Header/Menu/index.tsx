import BarMenu from './BarMenu'
import SidenavMenu from './SidenavMenu'
import { getMenuType, getModalShow, getSidenavShow, useAppSelector } from '../../../store'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useMemo } from 'react'

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
        {menu}
      </AnimatePresence>
    </>
  )
}

export default Menu
