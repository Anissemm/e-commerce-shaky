import { Router } from "express"
import { signIn } from "../controllers/api/signin"

const signInRouter = Router()

signInRouter.route('/signin').post(signIn)

export default signInRouter