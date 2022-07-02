import { Router } from "express"
import { signInController, signUpController } from "../controllers/authController"

const authRouter = Router()

authRouter.route('/sign-in').post(signInController)
authRouter.route('/sign-up').post(signUpController)

export default authRouter