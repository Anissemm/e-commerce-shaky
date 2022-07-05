import { Router } from "express"
import { resendVerificationMail, verifyMail } from "../controllers/api/EmailVerification"

const verifyMailRouter = Router()

verifyMailRouter.route('/verifyEmail').post(verifyMail)
verifyMailRouter.route('/verifyEmail/resend').post(resendVerificationMail)

export default verifyMailRouter