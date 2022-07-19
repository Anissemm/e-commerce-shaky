import { useFormik } from 'formik'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Input from '../Input'
import * as yup from 'yup'
import Button from '../Button'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearSignUpFormValues, getSignUpFormValues, setSignUpFormValues, useAppDispatch, useAppSelector } from '../../store'
import { useSignUpMutation } from '../../store/slices/userSlice'
import { ReactComponent as Loader } from '../../assets/svg/loader.svg'
import Alert from '../Alert'
import { passwordRegexLean } from '../../regex'

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

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  name: yup.string().required('Name is Required'),
  password: yup.string().matches(passwordRegexLean, "Must contain 8 characters, one uppercase, one lowercase and one number. Can contain special case character").required('Password is required'),
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
    const { email, name } = signUpForm.values
    if (!signUpForm.errors.email && email && email.length > 1)
      dispatch(setSignUpFormValues({ email, name }))
  }, [signUpForm.values])

  useEffect(() => {
    if (userCreated) {
      dispatch(clearSignUpFormValues())
      navigate('email-verification', { state: { msg: 'user-created', email: signUpForm.values.email } })
    }
  }, [userCreated])

  return (
    <motion.div
      key="signup-form"
      layout
      variants={viewVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ ease: 'linear' }}
      className='px-8 relative'>

      <AnimatePresence>
        {isLoading ? <motion.div key="sign-up-loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='top-0 left-0 z-[2] absolute min-w-full min-h-full bg-raven bg-opacity-40 flex items-center justify-center'>
          <Loader className='bg-opacity-100' width={60} height={60} />
        </motion.div> : null}
      </AnimatePresence>

      <small
        className='flex py-4 item-center h-full justify-end w-full text-sandy-brown font["Roboto_Condensed"]'>
        *Required
      </small>
      <AnimatePresence>
        {requestError ?
          <Alert key='sign-up-alert' className='mt-2 mb-5 '>
            {requestError}
          </Alert> :
          null}
      </AnimatePresence>
      <form autoComplete='off' onSubmit={signUpForm.handleSubmit}>
        <div className={`pb-5`}>
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
        </div>
        <div className={`pb-5`}>
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
        </div>
        <div className={`pb-5`}>
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
        </div>
        <div className={`pb-5`}>
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
        </div>
        <div className={`pb-2`}>
          <Button type='submit' color='yellow'>
            Sign Up
          </Button>
        </div>
        <div className={`pb-5 pt-2`}>
          <p className='mx-auto text-center max-w-[240px] text-gray-500 font-["Roboto_Condensed"] font-light text-[14px]'>
            By creating an account, you agree to
            our <Link to='/terms-of-service' className='text-sandy-brown hover:bg-opacity-80'>
              <span>Terms of Service</span>
            </Link> and <Link className='text-sandy-brown hover:bg-opacity-80' to='/privacy-policy' >Privacy Policy</Link>.
          </p>
        </div>
      </form>
    </motion.div>
  )
}

export default SignUpForm