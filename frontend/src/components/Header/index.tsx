import { useMenuResponsive } from '../../hooks/useMenuResponsive'
import { useAppSelector } from '../../store'
import { getCurrentPageTitle } from '../../store/slices/pageSlice'
import HeaderToolbar from './HeaderToolbar'
import Menu from './Menu'

const Header = () => {
    const [setTargetRef] = useMenuResponsive()
    const pageTitle = useAppSelector(getCurrentPageTitle)

    return (
        <header className='sticky z-[49] top-0'
            ref={ref => {
                if (typeof setTargetRef === 'function') {
                    setTargetRef(ref)
                }
            }}
        >
            {pageTitle.mount && <h1 className={`${pageTitle.show ? '' : 'sr-only'}`}>{pageTitle.value}</h1>}
            <HeaderToolbar />
            <Menu />
        </header>
    )
}

export default Header
