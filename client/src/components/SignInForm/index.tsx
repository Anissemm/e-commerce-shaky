import { motion } from 'framer-motion'
import Input from '@material-tailwind/react/components/Input'

const SignInForm = () => {
  return (
    <motion.div>
      <form>
        <Input label='Username' variant='outlined' />
      </form>
    </motion.div>
  )
}

export default SignInForm