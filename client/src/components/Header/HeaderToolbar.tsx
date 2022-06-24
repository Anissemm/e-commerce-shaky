import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/svg/logo.svg'
import { ReactComponent as UserIcon } from '../../assets/svg/icons/user_icon.svg'
import { ReactComponent as MenuIcon } from '../../assets/svg/icons/menu_icon.svg'
import { ReactComponent as CartIcon } from '../../assets/svg/icons/cart_icon.svg'
import { ReactComponent as SearchIcon } from '../../assets/svg/icons/search_icon.svg'
import { motion } from 'framer-motion'
import { useAppDispatch, toggleSideNav } from '../../store' 

const HeaderToolbar = () => {
    const dispatch = useAppDispatch()

    const handleSidenavToggle: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(toggleSideNav())
    }

    return (
        <div className='fixed z-[46] min-h-[52px] w-screen bg-ebony-clay shadow-lg
             flex items-center justify-between px-5'>
            <div className='flex items-center gap-3'>
                <motion.div className='flex items-end'>
                    <button
                        onClick={handleSidenavToggle}
                        data-sidenav-toggle
                        className=' p-[1px]'
                        aria-label='Side navigation toggle'>
                        <MenuIcon width={30} height={30} />
                    </button>
                </motion.div>
                <motion.div>
                    <Link to="/">
                        <Logo />
                    </Link>
                </motion.div>
            </div>
            {/* Search modal*/}

            <div className='userControls flex items-center ml-auto gap-2'>
                {/* <div className='searchInput'></div> input */}
                <div className="flex items-center gap-5 justify-center">
                    <button className='login p-[1px]' aria-label='User authentication'>
                        <SearchIcon />
                    </button>

                    <button className='login p-[1px]' aria-label='User authentication'>
                        <UserIcon />
                    </button>

                    <button className='login p-[1px]' aria-label='User authentication'>
                        <CartIcon />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default HeaderToolbar