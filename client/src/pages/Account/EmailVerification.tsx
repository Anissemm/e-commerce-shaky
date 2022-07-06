import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useVerifyEmailMutation } from '../../store/slices/userSlice'
import { Helmet } from 'react-helmet'
import Letter from '../../assets/svg/icons/letter-verif'
import { usePageSetTitle } from '../../hooks/usePageSet'
import Button from '../../components/Button'

interface SignUpState {
  email: string
  msg: string
}

interface Variants {
  [key: string]: {
    [key: string]: string | number
  }
}

interface User {
  email: string,
  name: string,
  id: string
}

const variants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }

}

const EmailVerification = () => {
  usePageSetTitle('Verification Email', false, false)
  const navigate = useNavigate()
  const [verifiedUser, setVerifiedUser] = useState<null | User>(null)

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation()
  const [requestError, setRequestError] = useState('')
  const { search, state } = useLocation()
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    if ((state as SignUpState)?.msg === 'user-created') {
      setMessageType('user-created')
    }
  }, [state])

  const handleVerifyEmail = async (search: string) => {
    if (/^\?verifyCode=\w+\.\w+$/.test(search)) {
      const code = search.split('=')[1]
      if (code) {
        try {
          const data = await verifyEmail(code).unwrap()
          setVerifiedUser(data.user)

          if (data.message === 'already-verified') {
            setMessageType('already-verified')
          }
          if (data.message === 'email-verified') {
            setMessageType('email-verified')
          }
        } catch (error) {
          setRequestError('Something went wrong. Please, resend a verification email and retry.')
        }
      }
    }
  }

  useEffect(() => {
    if (search) {
      handleVerifyEmail(search)
    }
  }, [])

  return (
    <div className='font-[Oswald]'>
      <Helmet>
        <title>Verification Email</title>
      </Helmet>
      <h1 className='inline-block my-6 text-xl xs:text-[24px] text-ebony-clay px-4 py-[10px] bg-sandy-brown uppercase font-[Oswald]  
      font-medium'>
        Email verification
      </h1>
      <motion.div className='my-5 px-2'>
        {messageType === 'user-created' &&
          <motion.div {...variants} className='max-w-[530px] min-h-[300px] px-3 xs:px-5 rounded-md w-full mx-auto bg-ebony-clay flex flex-col items-center justify-center py-4'>
            <Letter className='w-16 xs:w-20' fillColor='melony-clay' fillOpacity={50} strokeColor='sandy-brown' />
            <motion.p className='uppercase py-2 text-sandy-brown text-center text-xl font-semibold px'>You are nearly there!</motion.p>
            <motion.p className='py-2 text-sandy-brown text-center font-["Roboto_Condensed"] text-base xs:text-xl font-normal'>
              We just need to verify your email address <span className='font-bold'>"{(state as SignUpState)?.email}"</span> to complete your
              <span className='uppercase font-bold'> SHAKY</span> sign up.<br />
              Please, verify your inbox and click the verification link to activate your account.</motion.p>
            <motion.p className='w-full px-10'>
              <Button
                onClick={(e: any) => {
                  navigate('/')
                }}
              >
                Go To Home
              </Button>
            </motion.p>
          </motion.div>
        }
        {messageType === 'email-verified' &&
          <motion.div {...variants} className='max-w-[530px] min-h-[300px] px-3 xs:px-5 rounded-md w-full mx-auto bg-ebony-clay flex flex-col items-center justify-center py-4'>
            <motion.p className='uppercase py-2 text-sandy-brown text-center text-xl font-semibold'>Your account has been verified!</motion.p>
            <motion.p className='py-2 text-sandy-brown text-center font-["Roboto_Condensed"] text-base xs:text-xl font-normal'>
              <span className='float-left'>
                <>Hey {verifiedUser?.name ? verifiedUser : 'Client'},</>
              </span>
              <br /> Thanks for confirming that this is your account.
            </motion.p>
            <motion.p className='w-full px-10'>
              <Button
                className='mb-4'
                onClick={(e: any) => {
                  navigate('/account')
                }}
              >
                Continue to Sign in
              </Button>
              <Button
                onClick={(e: any) => {
                  navigate('/')
                }}
              >
                Go To Home
              </Button>
            </motion.p>
          </motion.div>
        }
        {messageType === 'already-verified' &&
          <motion.div {...variants} className='max-w-[530px] min-h-[300px] px-3 xs:px-5 rounded-md w-full mx-auto bg-ebony-clay flex flex-col items-center justify-center py-4'>
            <motion.p className='uppercase py-2 text-sandy-brown text-center text-xl font-semibold'>Your account has been verified!</motion.p>
            <motion.p className='py-2 pb-7 text-sandy-brown text-center font-["Roboto_Condensed"] text-base xs:text-xl font-normal'>
              <span className='float-left'>
                <>Hey {verifiedUser?.name ? verifiedUser?.name : 'Client'},</>
              </span>
              <br /> Your account is already verirfied.
            </motion.p>
            <motion.p className='w-full px-10'>
              <Button
                className='mb-4'
                onClick={(e: any) => {
                  navigate('/account')
                }}
              >
                Continue to Sign in
              </Button>
              <Button
                onClick={(e: any) => {
                  navigate('/')
                }}
              >
                Go To Home
              </Button>
            </motion.p>
          </motion.div>
        }

      </motion.div>
    </div>
  )
}

export default EmailVerification