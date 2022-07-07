import { Router } from "express"
import { resetPassword, sendResetPasswordToken, verifyResetPasswordToken } from "../controllers/api/resetPassword"


const passwordResetRouter = Router()

passwordResetRouter.route('/resetPassword/send').post(sendResetPasswordToken)
passwordResetRouter.route('/resetPassword/verifyToken').post(verifyResetPasswordToken)
passwordResetRouter.route('/resetPassword/reset').post(resetPassword)

export default passwordResetRouter