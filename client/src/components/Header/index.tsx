import { useMenuResponsive } from '../../hooks/useMenuResponsive'
import HeaderToolbar from './HeaderToolbar'
import Menu from './Menu'

const Header = () => {
    const [setTargetRef] = useMenuResponsive()

    return (
        <header className='relative' 
        ref={ref => {
            if (typeof setTargetRef === 'function') {
            setTargetRef(ref)
        }}}
        >
            <HeaderToolbar />
            <Menu />
        </header>
    )
}

export default Header
