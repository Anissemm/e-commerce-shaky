import { Router } from "express"
import { resendVerificationMail, verifyMail } from "../../controllers/user/emailVerification"
import handleRefreshToken from "../../controllers/user/refresh"
import { resetPassword, sendResetPasswordToken, verifyResetPasswordToken } from "../../controllers/user/resetPassword"
import { signIn } from "../../controllers/user/signIn"
import SignOut from "../../controllers/user/signOut"
import { signUp } from "../../controllers/user/signUp"

const userRouter = Router()

userRouter.route('/verifyEmail').post(verifyMail)
userRouter.route('/verifyEmail/resend').post(resendVerificationMail)

userRouter.get('/refresh', handleRefreshToken)

userRouter.route('/resetPassword/send').post(sendResetPasswordToken)
userRouter.route('/resetPassword/verifyToken').post(verifyResetPasswordToken)
userRouter.route('/resetPassword/reset').post(resetPassword)

userRouter.route('/signin').post(signIn)

userRouter.route('/signout').patch(SignOut)

userRouter.route('/signup').post(signUp)

export default userRouter