import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/svg/logo.svg'
import { ReactComponent as UserIcon } from '../../assets/svg/icons/user_icon.svg'
import { ReactComponent as MenuIcon } from '../../assets/svg/icons/menu_icon.svg'
import { ReactComponent as CartIcon } from '../../assets/svg/icons/cart_icon.svg'
import { ReactComponent as SearchIcon } from '../../assets/svg/icons/search_icon.svg'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector, toggleSideNav } from '../../store' 

const HeaderToolbar = () => {
    const dispatch = useAppDispatch()

    const handleSidenavToggle: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(toggleSideNav())
    }

    return (
        <div className='min-h-[52px] bg-ebony-clay flex items-center justify-between px-5'>
            <div className='flex items-center gap-3'>
                <motion.div className='flex items-end'>
                    <button
                        onClick={handleSidenavToggle} 
                        aria-label='Side navigation toggle'>
                        <MenuIcon />
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
                    <button className='login' aria-label='User authentication'>
                        <SearchIcon />
                    </button>

                    <button className='login' aria-label='User authentication'>
                        <UserIcon width={25} height={25} />
                    </button>

                    <button className='login' aria-label='User authentication'>
                        <CartIcon width={30} height={30} />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default HeaderToolbar