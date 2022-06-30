import { MouseEventHandler } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/svg/logo.svg'
import { motion } from 'framer-motion'
import { useAppDispatch, toggleSideNav, useAppSelector, getMenuType, toggleModal } from '../../../store'
import Search from '../../Search'
import style from './HeaderToolbar.module.css'

const HeaderToolbar = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const menuType = useAppSelector(getMenuType)

    const user = null //hard coded

    const handleSidenavToggle: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(toggleSideNav())
    }

    return (
        <div className='relative z-[46] min-h-[52px] w-screen bg-ebony-clay shadow-lg
             flex items-center justify-between px-5'>
            <div className='flex items-center gap-3'>
                <motion.div className='flex items-end'>
                    {menuType === 'sidenav' && <motion.button
                        onClick={handleSidenavToggle}
                        data-sidenav-toggle
                        className={`w-[25px] h-[25px] ${style.svgBackground} ${style.menuToggle}`}
                        aria-label='Side navigation toggle'>
                    </motion.button>}
                </motion.div>
                <motion.div>
                    <Link to="/">
                        <Logo />
                    </Link>
                </motion.div>
            </div>
            <Search />
            <div className='userControls flex items-center ml-auto gap-2'>
                <div className="flex items-center gap-5 justify-center">
                    {menuType === 'sidenav' &&
                        <motion.button
                            className={`w-[25px] h-[25px] ${style.svgBackground} ${style.search}`} aria-label='User authentication'
                            onClick={() => dispatch(toggleModal())}
                        >
                            {/* <SearchIcon /> */}
                        </motion.button>}

                    <button
                        onClick={() => {
                            if (!user) {
                                navigate('/my-account')
                            } else {
                                navigate('/my-account/dashboard')
                            }
                        }}
                        className={`w-[25px] h-[25px] ${style.svgBackground} ${style.user}`} aria-label='User authentication'>
                        {/* <UserIcon /> */}
                    </button>

                    <button className={`w-[30px] h-[30px] ${style.svgBackground} ${style.cart}`} aria-label='User authentication'>
                        {/* <CartIcon /> */}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default HeaderToolbar