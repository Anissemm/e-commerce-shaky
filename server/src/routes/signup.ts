import { Router } from "express"
import { signUp } from "../controllers/api/signup"

const signUpRouter = Router()

signUpRouter.route('/signup').post(signUp)

export default signUpRouter