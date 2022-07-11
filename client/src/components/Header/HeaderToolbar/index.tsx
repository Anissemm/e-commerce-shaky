import { MouseEventHandler } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/svg/logo.svg'
import { motion } from 'framer-motion'
import { useAppDispatch, toggleSideNav, useAppSelector, getMenuType, toggleModal, getUserId } from '../../../store'
import Search from '../../Search'
import style from './HeaderToolbar.module.css'
import CartModal from '../../CartModal'
import AccountModal from '../../AccountModal'

const HeaderToolbar = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const menuType = useAppSelector(getMenuType)

    const userId = useAppSelector(getUserId)

    const handleSidenavToggle: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(toggleSideNav())
    }

    return (
        <div className='relative z-[46] min-h-[52px] w-full bg-ebony-clay shadow-lg px-5 flex items-center justify-between'>
            <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
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
                                onClick={() => dispatch(toggleModal({ modalId: 'search-modal' }))}
                            >
                            </motion.button>
                        }
                        <div className='flex items-center justify-center'>
                            <button
                                onClick={() => {
                                    if (!userId) {
                                        navigate('/account')
                                    } else {
                                        dispatch(toggleModal({ modalId: 'account-modal', show: true }))
                                    }
                                }}
                                className={`w-[25px] h-[25px] ${style.svgBackground} ${style.user}`} aria-label='User authentication'>
                            </button>
                            <AccountModal />
                        </div>

                        <div className='flex items-center justify-center'>
                            <button
                                onClick={() => dispatch(toggleModal({ modalId: 'cart-modal' }))}
                                className={`w-[30px] h-[30px] ${style.svgBackground} ${style.cart}`} aria-label='User authentication'>
                            </button>
                            <CartModal />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderToolbar