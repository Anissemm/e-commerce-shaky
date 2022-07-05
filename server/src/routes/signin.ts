import { Router } from "express"
import { signIn } from "../controllers/api/signin"

const signInRouter = Router()

signInRouter.route('/sign-in').post(signIn)

export default signInRouter