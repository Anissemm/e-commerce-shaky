import { useFormik, yupToFormErrors } from "formik"
import { AnimatePresence, motion, useTime, useTransform } from "framer-motion"
import React, { PropsWithChildren, useEffect, useState } from "react"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import ModalBody from "../Modal/ModalBody"
import ModalHeader from "../Modal/ModalHeader"
import * as yup from 'yup'
import { getSignInFormValues, toggleModal, useAppDispatch, useAppSelector } from "../../store"
import { useSendResetEmailMutation } from "../../store/slices/userSlice"
import Alert from "../Alert"
import Loader from '../../assets/svg/icons/letter-verif'

interface ForgotPasswordVariants {
  [key: string]: {
    [key: string]: string | number
  }
}

const variants: ForgotPasswordVariants = {
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
  email: yup.string().email('Please, enter a valid email address').required('Email is required')
})

const ForgotPasswordModal: React.FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch()
  const [sendResetEmail, { isLoading }] = useSendResetEmailMutation()
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [time, setTime] = useState(5)

  const { email: savedEmail } = useAppSelector(getSignInFormValues)
  const resetForm = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email } = values
      try {
        const response = await sendResetEmail(email).unwrap()
        setResponse(response.message)
      } catch (error: any) {
        const { message } = error?.data
        setError(message)
      }
    }
  })

  useEffect(() => {
    if (savedEmail) {
      resetForm.values.email = savedEmail
    }
  }, [savedEmail])

  useEffect(() => {
    if (response === 'reset-mail-sent') {
      const timeoutKey = setTimeout(() => {
        setResponse(null)
        setError(null)
        setTime(5)
        dispatch(toggleModal({ modalId: 'forgot-password-modal', show: false }))
      }, 5200)

      const intervalKey = setInterval(() => {
        if (time > 0) {
          setTime(prev => prev - 1)
        }
      }, 1000)

      return () => {
        clearTimeout(timeoutKey)
        clearInterval(intervalKey)
      }
    }
  }, [response])

  return (
    <Modal width={500} height='80%' modalId="forgot-password-modal">
      <ModalHeader title="Password Reset" />
      <AnimatePresence>
        {isLoading ? <motion.div key='loader' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='top-0 left-0 z-[2] absolute min-w-full min-h-full bg-raven bg-opacity-40 flex items-center justify-center'>
          <Loader className='bg-opacity-100' width={60} height={60} />
        </motion.div> : null}
        <ModalBody className="overflow-y-auto">
          <motion.div className="px-7 pt-7">
            {!response && <motion.div {...variants}>
              <motion.p className="font-['Roboto_Condensed'] text-center">
                Please enter your account email address. Instructions on how to Reset your Password will be sent to this address.
              </motion.p>
              <motion.small
                className='flex py-4 item-center leading-none h-full justify-end w-full text-sandy-brown font["Roboto_Condensed"]'>
                *Required
              </motion.small>
              {error ?
                <Alert>
                  {
                    error === 'user-not-found' ? 'There is no user with the provided email.' :
                      error === 'missing-email' ? 'Email is Required.' :
                        'Something went wrong. Please, retry later.'
                  }
                </Alert> :
                null}
              <form onSubmit={resetForm.handleSubmit}>
                <motion.div className="pt-5">
                  <Input
                    label='Email'
                    type="text"
                    error={resetForm.touched && resetForm.errors.email}
                    onChange={(e) => {
                      setError(null)
                      resetForm.handleChange(e)
                    }}
                    onBlur={resetForm.handleBlur}
                    name="email"
                    value={resetForm.values.email}
                    id="reset-email" />
                </motion.div>
                <motion.div className="flex justify-center items-center pt-8">
                  <Button type='submit' className="w-[230px] px-2 py-8 leading-none">Reset your password</Button>
                </motion.div>
              </form>
            </motion.div>}
            {response === 'reset-mail-sent' &&
              <motion.div {...variants} >
                <motion.p className="relative font-['Roboto_Condensed'] text-center">
                  We have sent to <span className="font-bold"><>"{resetForm.values.email}"</></span> an email with a link in order to reset your password.
                  Please, check your inbox and click on the reset link.
                </motion.p>
                <motion.p className="relative font-['Roboto_Condensed'] text-center">
                  This dialog will close in {time}</motion.p>
              </motion.div>
            }
          </motion.div>
        </ModalBody>
      </AnimatePresence>
    </Modal >
  )
}

export default ForgotPasswordModal