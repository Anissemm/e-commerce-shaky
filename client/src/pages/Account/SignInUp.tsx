import { AnimatePresence, motion } from 'framer-motion'
import { MutableRefObject, useState } from 'react'
import SignInForm from '../../components/SignInForm'
import SignUpForm from '../../components/SignUpForm'
import { useClientBox } from '../../hooks/useBox'
import { usePageSetTitle } from '../../hooks/usePageSet'

const SignUp = () => {
  usePageSetTitle('My Account', false, false)

  const [activeTab, setaActiveTab] = useState('signin')
  const [shadow, setShadow] = useState(true)
  const [clientRect, formWrapperRef] = useClientBox()

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
              if (info.offset.x > 70) {
                setaActiveTab('signin')
              } else if (info.offset.x < -70) {
                setaActiveTab('signup')
              }
            }
          }}
          style={{ minHeight: `calc(100vh - ${clientRect.top ? clientRect.top : 0}px - 50px)` }}
          ref={formWrapperRef as MutableRefObject<HTMLDivElement>}
          layout
          className='max-w-[530px] mx-auto rounded-xl overflow-hidden bg-ebony-clay touch-none'>
          <motion.div className='grid grid-cols-2'>
            {['signin', 'signup'].map(item => {
              return (
                <motion.button
                  key={item}
                  style={{
                    boxShadow: activeTab === item && shadow ?
                      `${item === 'signin' ? '' : '-'}2.5px 0 3px #222831` :
                      'none'
                  }}
                  onClick={() => { setaActiveTab(item) }}
                  disabled={activeTab === item}
                  aria-disabled={activeTab === item}
                  className={`flex items-center justify-center uppercase py-3 
                  transition duration-200
                  relative font-medium text-[24px] bg-transparent text-sandy-brown
                  ${activeTab !== item ? 'z-[0]' : `z-[1] `}`}
                >
                  <span className={`relative z-[2] ${activeTab !== item ? 'text-ebony-clay' : ''}`}>{item === 'sign-in' ? 'Sign In' : 'Sign Up'}</span>
                  {activeTab !== item && <motion.span
                    onLayoutAnimationStart={() => { setShadow(false) }}
                    onLayoutAnimationComplete={() => { setShadow(true) }}
                    className={`bg-sandy-brown z-[1] text-ebony-clay absolute top-0 left-0 h-full w-full`}
                    layoutId='tab-background' />}
                </motion.button>

              )
            })}

          </motion.div>

          {activeTab === 'signin' ? <SignInForm key={'signin'} /> : <SignUpForm key={'signup'} />}
        </motion.div>
      </AnimatePresence>
    </div >

  )
}

export default SignUp