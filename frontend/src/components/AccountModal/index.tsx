import React, { HTMLAttributes, RefAttributes, useEffect, useState } from 'react'
import { getUser, toggleModal, useAppDispatch, useAppSelector } from '../../store'
import Button from '../Button'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'
import { ReactComponent as Arrow } from '../../assets/svg/icons/arrow_left_icon.svg'
import { ReactComponent as SignOutIcon } from '../../assets/svg/icons/sign-out-icon.svg'
import { Link, LinkProps, Navigate, useNavigate } from 'react-router-dom'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import useSignOut from '../../hooks/useSignOut'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactComponent as Loader } from '../../assets/svg/loader.svg'
import slugify from 'slugify'
import { createPortal, flushSync } from 'react-dom'
import FullScreenLoader from '../FullScreenLoader'

const menuItems = [
  'Order History',
  'Pending Shipment',
  'Pending Payment',
  'Invite Freinds',
  'Customer Support',
  'FAQ'
]

const AccountModal = () => {
  const user = useAppSelector(getUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [signOut] = useSignOut()
  const [loadingSignOut, setLoadingSignOut] = useState(false)
  const [setResizeRef, entry] = useResizeObserver()
  const [listHeight, setListHeight] = useState<string | number>('auto')

  useEffect(() => {
    if (entry?.borderBoxSize) {
      const { blockSize } = entry?.borderBoxSize[0]
      const listH = window.innerHeight - Math.round(blockSize + 246)
      setListHeight(listH)
    }
  }, [entry])

  const handleClick = () => {
    dispatch(toggleModal({ modalId: 'account-modal', show: false }))
  }

  return (
    <>
      <AnimatePresence>
        {loadingSignOut &&
          createPortal(<FullScreenLoader />, document.getElementById('root')!)}
      </AnimatePresence>
      <Modal justify='end' align='start' right={20} width={400} modalId='account-modal'>
        <ModalHeader title='Account' />
        <ModalBody>
          <div>
            <div ref={ref => {
              if (typeof setResizeRef === 'function') {
                setResizeRef(ref)
              }
            }}
              className='grid grid-cols-[1fr_minmax(100px,_120px)] sxs:grid-cols-[1fr_minmax(120px,_140px)] gap-2 sxs:gap-3 mx-4 sxs:mx-7 font-[Oswald]'>
              <div className='flex items-center justify-center'>
                <div className='flex items-start justify-center flex-col text-center'>
                  <div
                    className='font-bold text-[20px] sxs:text-[24px] text-sandy-brown uppercase leading-none max-w-[140px] sxs:max-w-[180px] truncate py-1'
                    title={user?.name}
                  >
                    {user?.name}
                  </div>
                  <div className='text-[12px] sxs:text-[15px] leading-none py-1'>{user?.email}</div>
                  <Button className='py-1 mt-2 text-[13px] sxs:text-[15px] max-w-[110px] sxs:max-w-[131px] self-center'>Manage account</Button>
                </div>
              </div>
              <div className='border-[5px] shadow-lg border-sandy-brown'>
                <img src={user?.avatarUrl as string} alt={`${user?.name}'s profile image`} className="object-contain" />
              </div>
            </div>
            <div
              className='pt-10 font-[Oswald]'>
              <ul
                style={{ maxHeight: listHeight }}
                className='px-7 overflow-y-auto h-full'>
                {menuItems.map(item => {
                  const slug = slugify(item, { lower: true, replacement: '-' })
                  return (
                    <AccountModalListLink key={slug} onClick={handleClick} value={item} to={`/account/${user?.id}/${slug}`} />
                  )
                })}
              </ul>
            </div>
          </div>
        </ModalBody>
        <div className='absolute bottom-6 w-full py-4 bg-sandy-brown px-7'>
          <button
            onClick={() => {
              dispatch(toggleModal({ show: false, modalId: 'account-modal' }))
              setLoadingSignOut(true)
              setTimeout(async () => {
                await signOut()
                navigate('/')
                setLoadingSignOut(false)
              }, 500)
            }}
            className='flex items-center justify-between font-[Oswald] uppercase text-[16px] 
          text-ebony-clay duration-150 transition'>
            <span className='leading-none'>Sign out</span>
            <SignOutIcon className='relative top-[2px] ml-3 w-5 rotate-180' />
          </button>
        </div>
      </Modal>
    </>
  )
}

interface AccountModalListLinkType extends LinkProps, HTMLAttributes<HTMLAnchorElement> {
  to: string
  className?: string
  value?: string
  onClick?: (e: any) => void
}

const AccountModalListLink: React.FC<AccountModalListLinkType> = ({ to, className = '', value = '', onClick = () => { }, ...props }) => {
  return (
    <li className='pb-3'>
      <Link
        to={to}
        onClick={(e: any) => {
          if (typeof onClick === 'function') {
            onClick(e)
          }
        }}
        className={`flex items-center justify-between uppercase hover:text-sandy-brown duration-150 hover:px-2 ${className}`}
        {...props}
      >
        <span>{value}</span>
        <Arrow className='rotate-180 w-2.5' />
      </Link>
    </li>
  )
}

export default AccountModal