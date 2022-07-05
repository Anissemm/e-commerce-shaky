import { Router } from "express"
import { resendVerificationMail, verifyMail } from "../controllers/api/emailVerification"

const verifyMailRouter = Router()

verifyMailRouter.route('/verifyEmail').get(verifyMail)
verifyMailRouter.route('/verifyEmail/resend').get(resendVerificationMail)

export default verifyMailRouter