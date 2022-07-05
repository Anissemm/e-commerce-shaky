import { Router } from "express"
import { sendResetPasswordToken, verifyTokenAndResetPassword } from "../controllers/api/resetPassword"


const passwordResetRouter = Router()

passwordResetRouter.route('/resetPassword/send').post(sendResetPasswordToken)
passwordResetRouter.route('/resetPassword/reset').post(verifyTokenAndResetPassword)

export default passwordResetRouter