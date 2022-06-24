import BarMenu from './BarMenu'
import SidenavMenu from './SidenavMenu'
import { getMenuType, getSidenavShow, useAppSelector } from '../../../store'
import { AnimatePresence, motion } from 'framer-motion'

const Menu = () => {
  const isSidenavShown: boolean = useAppSelector(getSidenavShow)
  const menuType: string = useAppSelector(getMenuType)

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {
          menuType === 'sidenav' && isSidenavShown ?
            <SidenavMenu /> :
            menuType === 'bar' ? <BarMenu /> :
              null
        }
      </AnimatePresence>
    </>
  )
}

export default Menu
