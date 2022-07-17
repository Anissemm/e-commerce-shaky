import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ForgotPasswordModal from '../../components/ForgotPasswordModal'
import { usePageSetTitle } from '../../hooks/usePageSet'
import { toggleModal, useAppDispatch } from '../../store'
import { useResetPasswordMutation, useVerifyResetTokenMutation } from '../../store/slices/userSlice'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { passwordRegexLean } from '../../regex'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { ReactComponent as Loader } from '../../assets/svg/loader.svg'

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

const validationSchema = yup.object({
  password: yup.string().matches(passwordRegexLean, "Must contain 8 characters, one uppercase, one lowercase and one number. Can contain special case character").required('Password is required'),
  passwordRetype: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required')
})

const PasswordReset = () => {
  usePageSetTitle('Reset Password', false, false)

  const dispatch = useAppDispatch()
  const [verifyResetToken, { isLoading: isVerifyLoading }] = useVerifyResetTokenMutation()
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation()

  const navigate = useNavigate()
  const { search } = useLocation()

  const [validToken, setValidToken] = useState<boolean | null>(false)
  const [resetResponse, setResetResponse] = useState<string | null>(null)
  const [error, setError] = useState<null | string>('')
  const [resetToken, setResetToken] = useState<string>('')

  const newPasswordForm = useFormik({
    initialValues: {
      password: '',
      passwordRetype: ''
    },
    validateOnBlur: true,
    validationSchema,
    onSubmit: async (values) => {
      const { password } = values
      try {
        const data = await resetPassword({ newPassword: password, resetToken }).unwrap()
        setResetResponse(data.message)
        setValidToken(false)
      } catch (error: any) {
        setError(error.data.message)
      }
    }
  })

  const handleVerifyResetToken = async (search: string) => {
    if (/^\?resetKey=/.test(search)) {
      const token = search.split('=')[1]
      setResetToken(token)
      if (token) {
        try {
          await verifyResetToken(token).unwrap()
          setValidToken(true)
          setError(null)
        } catch (error: any) {
          setError(error.data.message)
          setValidToken(false)
        }
      }
    }
  }

  useEffect(() => {
    if (search) {
      handleVerifyResetToken(search)
    }
  }, [])

  return (
    <div className='font-[Oswald]'>
      <h1 className='inline-block my-6 text-xl xs:text-[24px] text-ebony-clay px-4 py-[10px] bg-sandy-brown uppercase font-[Oswald]  
      font-medium'>
        Reset Password
      </h1>
      <motion.div {...variants} className='max-w-[530px] min-h-[300px] px-3 xs:px-5 rounded-md w-full mx-auto bg-ebony-clay flex flex-col items-center justify-center py-4'>
        {isVerifyLoading || isResetLoading && !resetResponse ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='top-0 left-0 z-[2] absolute min-w-full min-h-full bg-raven bg-opacity-40 flex items-center justify-center'>
          <Loader className='bg-opacity-100' width={60} height={60} />
        </motion.div> :
          null}
        <motion.div className='my-5 px-2'>
          {validToken &&
            <motion.div key='validToken' {...variants} className='max-w-[530px] min-h-[300px] px-3 xs:px-5 rounded-md w-full mx-auto bg-ebony-clay flex flex-col items-center justify-center py-4'>
              <motion.p className='uppercase py-2 text-sandy-brown text-center text-xl font-semibold px'>
                Please, enter your new password twice so we can verify you typed it in correctly
              </motion.p>
              <motion.div className='pb-2 pt-4 text-sandy-brown w-full text-center font-["Roboto_Condensed"] text-base xs:text-xl font-normal'>
                <form onSubmit={newPasswordForm.handleSubmit}>
                  <motion.div className={`pb-5 text-left`}>
                    <Input
                      required
                      label='Password'
                      type='password'
                      id='password'
                      onChange={newPasswordForm.handleChange}
                      onBlur={newPasswordForm.handleBlur}
                      value={newPasswordForm.values.password}
                      error={newPasswordForm.touched.password && typeof newPasswordForm.errors.password === 'string' && newPasswordForm.errors.password}
                      placeholder='*************' />
                  </motion.div>
                  <motion.div className={`pb-5 text-left`}>
                    <Input
                      required
                      label='Confirm password'
                      type='password'
                      id='passwordRetype'
                      onChange={newPasswordForm.handleChange}
                      onBlur={newPasswordForm.handleBlur}
                      value={newPasswordForm.values.passwordRetype}
                      error={newPasswordForm.touched.passwordRetype && typeof newPasswordForm.errors.passwordRetype === 'string' && newPasswordForm.errors.passwordRetype}
                      placeholder='*************' />
                  </motion.div>
                  <motion.div className={`pb-2`}>
                    <Button type='submit' color='yellow'>
                      Save new password
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          }
          {!validToken && error && !resetResponse &&
            <motion.div key='invalidToken' {...variants}>
              <motion.p className='uppercase py-2 text-sandy-brown text-center text-xl font-semibold px'>
                Invalid reset link
              </motion.p>
              <motion.p className='py-2 text-sandy-brown text-center font-["Roboto_Condensed"] text-base xs:text-xl font-normal'>
                Sorry, but your reset link is invalid or has been expired. You can re-send a new reset link by clicking the button below.</motion.p>
              <motion.div className={`pt-4 pb-2`}>
                <Button
                  onClick={() => {
                    dispatch(toggleModal({ modalId: 'forgot-password-modal', show: true }))
                  }}
                  color='yellow'>
                  Resend reset link
                </Button>
              </motion.div>
              <motion.div>
                <Button
                  onClick={() => {
                    navigate('/')
                  }}
                  color='yellow'>
                  Go to home
                </Button>
              </motion.div>
            </motion.div>
          }
          {resetResponse === 'passsword-reset-success' ?
            <motion.div
              key='success'
              {...variants}
            >
              <motion.p className='uppercase py-2 text-sandy-brown text-center text-xl font-semibold px'>
                Congratulations!
              </motion.p>
              <motion.p className='py-2 text-sandy-brown text-center font-["Roboto_Condensed"] text-base xs:text-xl font-normal'>
                Your new password has been saved.</motion.p>
              <motion.div className={`pt-4 pb-2`}>
                <Button
                  onClick={() => {
                    navigate('/account')
                  }}
                  color='yellow'>
                  Go to Login
                </Button>
              </motion.div>
              <motion.div className={`pb-2`}>
                <Button
                  onClick={() => {
                    navigate('/')
                  }}
                  color='yellow'>
                  Go to Home
                </Button>
              </motion.div>
            </motion.div>
            : null
          }
        </motion.div>
      </motion.div>
      <ForgotPasswordModal />
    </div>
  )
}

export default PasswordReset