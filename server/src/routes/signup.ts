import { Router } from "express"
import { signUp } from "../controllers/api/signup"

const signUpRouter = Router()

signUpRouter.route('/sign-up').post(signUp)

export default signUpRouter