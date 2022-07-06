import { useFormik } from 'formik'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Input from '../Input'
import * as yup from 'yup'
import Button from '../Button'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSignUpFormValues, setFormValues, useAppDispatch, useAppSelector } from '../../store'
import { useSignUpMutation } from '../../store/slices/userSlice'
import { ReactComponent as Loader } from '../../assets/svg/loader.svg'

const viewVariants: Variants = {
  hidden: {
    x: '-100%',
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
const passwordRegex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  name: yup.string().required('Name is Required'),
  password: yup.string().matches(passwordRegex, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required('Password is required'),
  passwordRetype: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required')
})

const SignUpForm = () => {
  const navigate = useNavigate()
  const [signUp, { isLoading }] = useSignUpMutation()
  const dispatch = useAppDispatch()
  const [requestError, setRequestError] = useState<string | null>(null)
  const signUpFormValues = useAppSelector(getSignUpFormValues)
  const [userCreated, setUserCreated] = useState(false)

  const handleRequestError = (error: any) => {
    switch (error?.data?.message) {
      case 'email-conflict':
        setRequestError('A user with this email address already exists.')
        break
      case 'missing-credentials':
        setRequestError('Missing Credentials')
        break
      default:
        setRequestError('Something went wrong while creating the user account. Please try later.')
    }
  }


  const signUpForm = useFormik({
    initialValues: signUpFormValues,
    validateOnBlur: true,
    validationSchema,
    onSubmit: async (values) => {
      setRequestError(null)
      try {
        const { email, name, password } = values
        await signUp({ email, name, password }).unwrap()
        setUserCreated(true)
      } catch (err: any) {
        handleRequestError(err)
      }
    }
  })
  useEffect(() => {
    dispatch(setFormValues({ email: signUpForm.values.email, name: signUpForm.values.name }))
  }, [signUpForm.values])

  useEffect(() => {
    if (userCreated) {
      navigate('email-verification', { state: { msg: 'user-created', email: signUpForm.values.email} })
    }
  }, [userCreated])

  return (
    <motion.div
      layout
      style={{ boxShadow: '2.5px -1.5px 2px #222831' }}
      variants={viewVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ ease: 'linear' }}
      className='px-8 relative'>

      <AnimatePresence>
        {isLoading ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} className='top-0 left-0 z-[2] absolute min-w-full min-h-full bg-raven bg-opacity-40 flex items-center justify-center'>
          <Loader className='bg-opacity-100' width={60} height={60} />
        </motion.div> : null}
      </AnimatePresence>
      <motion.small
        className='flex py-4 item-center h-full justify-end w-full text-sandy-brown font["Roboto_Condensed"]'>
        *Required
      </motion.small>
      <AnimatePresence>
        {requestError ?
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100%', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='p-3 italic text-[14px] rounded-xl mt-2 mb-5 bg-red-200 border-2 border-red-500 shadoe-md 
          shadow-red-400 text-red-800 font-["Roboto_Condensed"] leading-none'>
            <motion.p>{requestError}</motion.p>
          </motion.div> :
          null}
      </AnimatePresence>
      <form autoComplete='off' onSubmit={signUpForm.handleSubmit}>
        <motion.div className={`pb-5`}>
          <Input
            required
            label='Email'
            type='email'
            id='email'
            name='email'
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            value={signUpForm.values.email}
            error={signUpForm.touched.email && typeof signUpForm.errors.email === 'string' && signUpForm.errors.email}
            placeholder='exemple@mail.com' />
        </motion.div>
        <motion.div className={`pb-5`}>
          <Input
            required
            label='Name'
            type='text'
            id='name'
            name='name'
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            value={signUpForm.values.name}
            error={signUpForm.touched.name && typeof signUpForm.errors.name === 'string' && signUpForm.errors.name}
            placeholder='Jhon Doe' />
        </motion.div>
        <motion.div className={`pb-5`}>
          <Input
            required
            label='Password'
            type='password'
            id='password'
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            value={signUpForm.values.password}
            error={signUpForm.touched.password && typeof signUpForm.errors.password === 'string' && signUpForm.errors.password}
            placeholder='*************' />
        </motion.div>
        <motion.div className={`pb-5`}>
          <Input
            required
            label='Confirm password'
            type='password'
            id='passwordRetype'
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
            value={signUpForm.values.passwordRetype}
            error={signUpForm.touched.passwordRetype && typeof signUpForm.errors.passwordRetype === 'string' && signUpForm.errors.passwordRetype}
            placeholder='*************' />
        </motion.div>
        <motion.div className={`pb-2`}>
          <Button type='submit' color='yellow'>
            Sign Up
          </Button>
        </motion.div>
        <motion.div className={`pb-5 pt-2`}>
          <motion.p className='mx-auto text-center max-w-[240px] text-gray-500 font-["Roboto_Condensed"] font-light text-[14px]'>
            By creating an account, you agree to
            our <Link to='/terms-of-service' className='text-sandy-brown hover:bg-opacity-80'>
              <span>Terms of Service</span>
            </Link> and <Link className='text-sandy-brown hover:bg-opacity-80' to='/privacy-policy' >Privacy Policy</Link>.
          </motion.p>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default SignUpForm