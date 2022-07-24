import { AnimatePresence, motion } from 'framer-motion'
import { MutableRefObject, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import SignInForm from '../../components/SignInForm'
import SignUpForm from '../../components/SignUpForm'
import { useClientBox } from '../../hooks/useBox'
import { usePageSetTitle } from '../../hooks/usePageSet'
import { getUser, useAppSelector } from '../../store'

const SignUp = () => {
  usePageSetTitle('My Account', false, false)
  const navigate = useNavigate()

  const user = useAppSelector(getUser)

  const [activeTab, setaActiveTab] = useState('signin')
  const [clientRect, formWrapperRef] = useClientBox()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className='font-[Oswald]'>
      <h1 className='inline-block my-6 text-ebony-clay px-4 py-[10px] bg-sandy-brown uppercase font-[Oswald] text-[24px] 
      font-medium'>
        My Account
      </h1>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          onPanEnd={(e, info) => {
            if ((e.type.startsWith('pointer') && (e as PointerEvent).pointerType === 'touch')
              || e.type.startsWith('touch')) {
              if (info.offset.x < -70) {
                setaActiveTab('signin')
              } else if (info.offset.x > 70) {
                setaActiveTab('signup')
              }
            }
          }}
          style={{ minHeight: `calc(100vh - ${clientRect.top ? clientRect.top + 50 : 50})` }}
          ref={formWrapperRef as MutableRefObject<HTMLDivElement>}
          layout
          className='max-w-[530px] relative mx-auto rounded-xl overflow-hidden bg-ebony-clay touch-none'>
          <motion.div className='grid relative z-0 grid-cols-2 bg-sandy-brown'>
            {['signin', 'signup'].map(item => {
              return (
                <motion.button
                  key={item}
                  style={{
                    boxShadow: activeTab === item ?
                      `${item === 'signin' ? '' : '-'}2.5px 0 3px #222831` :
                      'none'
                  }}
                  onClick={() => { setaActiveTab(item) }}
                  disabled={activeTab === item}
                  aria-disabled={activeTab === item}
                  className={`flex items-center justify-center uppercase py-3 
                  transition duration-200
                  relative font-medium text-[24px] bg-transparent
                  ${activeTab !== item ? 'z-[0]' : `z-[1] `}`}
                >
                  <span className={`relative z-[2] ${activeTab === item ? 'text-sandy-brown' : 'text-ebony-clay'}`}>{item === 'signin' ? 'Sign In' : 'Sign Up'}</span>
                  {activeTab === item && <motion.span
                    className={`text-sandy-brown bg-ebony-clay absolute top-0 left-0 h-[70px] w-full`}
                    layoutId='tab-background' />}
                </motion.button>

              )
            })}
          </motion.div>
          <div className='relative z-1'>
            {activeTab === 'signin' ? <SignInForm key={'signin'} /> : <SignUpForm key={'signup'} />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div >

  )
}

export default SignUp