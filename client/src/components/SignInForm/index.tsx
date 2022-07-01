import { useFormik } from 'formik'
import { motion, Variants } from 'framer-motion'
import Input from '../Input'
import Button from '../Button'
import * as yup from 'yup'
import { ReactComponent as Google } from '../../assets/svg/icons/google_icon.svg'


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
  username: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required')
})

const SignInForm = () => {
  const signInForm = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values)
    }
  })
  
  return (
    <motion.div
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
            id='username'
            placeholder='exemple@mail.com' />
        </motion.div>
        <motion.div className={`pb-5`}>
          <Input
            required
            label='Password'
            type='password'
            id='password'
            placeholder='*************' />
        </motion.div>
        <motion.div>
          <motion.button className='hover:text-sandy-brown font-[Roboto] text-[14px] text-gray-500 flex items-center pb-5 justify-end w-full'>
            Forgot your password?
          </motion.button>
        </motion.div>
        <motion.div className={`pb-2`}>
          <Button color='yellow'>
            Sign in
          </Button>
        </motion.div>
        <motion.div className={`pb-5`}>
          <Button color='softBlue'>
            <span className='flex items-center justify-center gap-2'>
              Sign in with
              <Google />
            </span>
          </Button>
        </motion.div>
        <motion.div className={`pb-5 pt-2`}>
          <motion.p className='mx-auto text-center max-w-[240px] text-gray-500 font-["Roboto_Condensed"] font-light text-[14px]'>
            Don’t have an account? Swipe right
            to <motion.button className='text-sandy-brown hover:bg-opacity-80'>
              <span> create a new account.</span>
            </motion.button>
          </motion.p>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default SignInForm