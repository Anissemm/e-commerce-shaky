import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'
import { usePageSetTitle } from '../hooks/usePageSet'

const SignUp = () => {
  usePageSetTitle('My Account', false, false)
  const [activeTab, setaActiveTab] = useState('sign-in')
  useEffect(() => {console.log(activeTab)}, [activeTab])
  return (
    <div className='font-[Oswald]'>
      <h1 className='inline-block my-6 text-ebony-clay px-4 py-[10px] bg-sandy-brown uppercase font-[Oswald] text-[24px] font-medium'>
        My Account
      </h1>
      <motion.div className='max-w-[530px] mx-auto'>
        <motion.div className='grid grid-cols-2'>
          {['sign-in', 'sign-up'].map(item => {
            return (
              <motion.button
                key={item}
                onClick={() => { setaActiveTab(item) }}
                disabled={activeTab === item}
                aria-disabled={activeTab === item}
                className={`flex items-center justify-center uppercase py-3 relative font-medium text-[24px] bg-transparent text-sandy-brown`}
              >
                <span className={`relative z-[2] ${activeTab !== item ? 'text-ebony-clay' : ''}`}>{item === 'sign-in' ? 'Sign In' : 'Sign Up'}</span>
                {activeTab !== item && <motion.span
                  className={`bg-sandy-brown z-[1] text-ebony-clay absolute top-0 left-0 h-full w-full`}
                  layoutId='tab-background' />}
              </motion.button>

            )
          })}

        </motion.div>
          {activeTab === 'sign-in' ? <SignInForm key={'sign-in'} /> : <SignUpForm key={'sign-up'} />}
      </motion.div>
    </div>
  )
}

export default SignUp