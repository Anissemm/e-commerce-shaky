import { useFormik } from 'formik'
import { motion, Variants } from 'framer-motion'
import Input from '../Input'
import Button from '../Button'
import * as yup from 'yup'
import { ReactComponent as Google } from '../../assets/svg/icons/google_icon.svg'
import { toggleModal, useAppDispatch, useAppSelector } from '../../store'
import { setCredentials, useSignInMutation } from '../../store/slices/userSlice'
import { useState } from 'react'
import ForgotPasswordModal from '../ForgotPassword'

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
  const [serverError, setServerError] = useState({ err: null, status: false })
  const [signIn, { isLoading }] = useSignInMutation()

  const signInForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = await signIn(values).unwrap()
        dispatch(setCredentials({ token: payload.token, id: '1234151' }))
        console.log(payload)
      } catch (err: any) {
        setServerError({ err, status: true })
      }

    }
  })

  return (
    <motion.div
      layout
      style={{ boxShadow: '2.5px -1.5px 2px #222831' }}
      variants={viewVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ ease: 'linear' }}
      className='px-8'>
      <motion.small
        className='flex py-4 item-center h-full justify-end w-full text-sandy-brown font["Roboto_Condensed"]'>
        *Required
      </motion.small>
      <form autoComplete='off' onSubmit={signInForm.handleSubmit}>
        <motion.div className={`pb-5`}>
          <Input
            required
            label='Email'
            type='text'
            name='email'
            id='email'
            error={signInForm.touched.email && typeof signInForm.errors.email === 'string' && signInForm.errors.email}
            onChange={signInForm.handleChange}
            onBlur={signInForm.handleBlur}
            value={signInForm.values.email}

            placeholder='exemple@mail.com' />
        </motion.div>
        <motion.div className={`pb-5`}>
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
        </motion.div>
        <motion.div>
          <motion.button
            type='button'
            onClick={() => { dispatch(toggleModal({ modalId: 'forgot-password-modal', show: true })) }}
            className='hover:text-sandy-brown font-[Roboto] text-[14px] text-gray-500 flex items-center pb-5 justify-end w-full'>
            Forgot your password?
          </motion.button>
        </motion.div>
        <motion.div className={`pb-2`}>
          <Button type='submit' color='yellow'>
            Sign in
          </Button>
        </motion.div>
        <motion.div className={`pb-5`}>
          <Button type="button" color='softBlue'>
            <span className='flex items-center justify-center gap-2'>
              Sign in with
              <Google />
            </span>
          </Button>
        </motion.div>
        <motion.div className={`pb-5 pt-2`}>
          <motion.p className='mx-auto text-center max-w-[240px] text-gray-500 font-["Roboto_Condensed"] font-light text-[14px]'>
            Don’t have an account? Swipe right
            to <motion.button type="button" className='text-sandy-brown hover:bg-opacity-80'>
              <span> create a new account.</span>
            </motion.button>
          </motion.p>
        </motion.div>
      </form>
      <ForgotPasswordModal />
    </motion.div>
  )
}

export default SignInForm