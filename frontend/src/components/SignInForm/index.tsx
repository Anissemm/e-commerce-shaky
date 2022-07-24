import { useFormik } from 'formik'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Input from '../Input'
import Button from '../Button'
import * as yup from 'yup'
import { ReactComponent as Google } from '../../assets/svg/icons/google_icon.svg'
import { getSignInFormValues, setRemembered, toggleModal, useAppDispatch, useAppSelector } from '../../store'
import { useEffect, useState } from 'react'
import ForgotPasswordModal from '../ForgotPasswordModal'
import { setSignInFormValues } from '../../store'
import useSignIn from '../../hooks/useSignIn'
import Alert from '../Alert'
import Checkbox from '../Checkbox'
import useYandexSignIn from '../../hooks/useYandexSignIn'

const viewVariants: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.8
      }
    }
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.8
      }
    }
  }
}

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 character long').required('Password is required')
})

const SignInForm = () => {
  const dispatch = useAppDispatch()
  const { email: initialEmailValue } = useAppSelector(getSignInFormValues)
  const [serverError, setServerError] = useState<null | string>(null)
  const [rememberMe, setRememberMe] = useState(false)
  const signIn = useSignIn()
  const signInWithYandex = useYandexSignIn()

  const signInForm = useFormik({
    initialValues: {
      email: initialEmailValue,
      password: ''
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      setServerError(null)
      try {
        await signIn(values)
        dispatch(setRemembered(rememberMe))
        setServerError(null)
      } catch (err: any) {
        setServerError(err.data?.message)
      }
    }
  })

  useEffect(() => {
    const { email } = signInForm.values
    if (!signInForm.errors.email && email.length > 1) {
      dispatch(setSignInFormValues({ email: email }))
    }
  }, [signInForm.values])

  return (
    <motion.div
      layout
      variants={viewVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ ease: 'linear' }}
      className='px-8 h-full'>
      <small
        className='flex py-4 item-center h-full justify-end w-full text-sandy-brown font["Roboto_Condensed"]'>
        *Required
      </small>
      <AnimatePresence>
        {serverError &&
          <Alert className='mb-3'>
            {
              serverError === 'wrong-credentials' ? 'Incorrect email address or password' :
                'Sorry, but something went wrong on the server. Please, try later.'
            }
          </Alert>}
      </AnimatePresence>
      <form autoComplete='off' className="flex flex-col justify-center items-center" onSubmit={signInForm.handleSubmit}>
        <div className='w-full'>
          <div className={`pb-5`}>
            <Input
              required
              label='Email'
              type='text'
              name='email'
              id='email'
              placeTooltip='top-start'
              error={signInForm.touched.email && typeof signInForm.errors.email === 'string' && signInForm.errors.email}
              onChange={ signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              value={signInForm.values.email}

              placeholder='exemple@mail.com' />
          </div>
          <div className={`pb-5`}>
            <Input
              required
              label='Password'
              type='password'
              onChange={signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              value={signInForm.values.password}
              error={signInForm.touched.password && typeof signInForm.errors.password === 'string' && signInForm.errors.password}
              name='password'
              id='password'
              placeholder='*************' />
          </div>
          <div className='flex items-center justify-end'>
            <button
              type='button'
              onClick={() => { dispatch(toggleModal({ modalId: 'forgot-password-modal', show: true })) }}
              className='hover:text-sandy-brown font-[Roboto] text-[14px] text-gray-500'>
              Forgot your password?
            </button>
          </div>
          <div className='pb-5'>
            <Checkbox
              id='remember-me'
              label='Remember Me'
              name='remember-me'
              onChange={() => setRememberMe(prev => !prev)}
              checked={rememberMe}
              className='text-raven font-["Roboto_Condensed"]'
            />
          </div>
          <div>
          </div>
        </div>
        <div className='w-full pt-5'>
          <div className={`pb-2`}>
            <Button type='submit' color='yellow'>
              Sign in
            </Button>
          </div>
          <div className={`pb-5`}>
            <Button type="button" onClick={signInWithYandex} color='softBlue'>
              <span className='flex items-center justify-center gap-2'>
                Sign in with Yandex
              </span>
            </Button>
          </div>
          <div className={`pb-5 pt-2`}>
            <p className='mx-auto text-center max-w-[240px] text-gray-500 font-["Roboto_Condensed"] font-light text-[14px]'>
              Don't have an account? Swipe right
              to <button type="button" className='text-sandy-brown hover:bg-opacity-80'>
                <span> create a new account.</span>
              </button>
            </p>
          </div>
        </div>
      </form>
      <ForgotPasswordModal />
    </motion.div>
  )
}

export default SignInForm