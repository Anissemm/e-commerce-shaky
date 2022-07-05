import { Router } from "express"
import { resetPassword, sendResetPasswordToken, verifyPasswordResetToken } from "../controllers/api/resetPassword"


const passwordResetRouter = Router()

passwordResetRouter.route('/resetPassword/send').post(sendResetPasswordToken)
passwordResetRouter.route('/resetPassword/verify').post(verifyPasswordResetToken)
passwordResetRouter.route('/resetPassword/reset').post(resetPassword)

export default passwordResetRouter