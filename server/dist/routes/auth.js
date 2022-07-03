import { Router } from "express";
import { signInController, signUpController, VerifyMailController } from "../controllers/authController.js";
const authRouter = Router();
authRouter.route('/sign-in').post(signInController);
authRouter.route('/sign-up').post(signUpController);
authRouter.route('/verifyEmail').get(VerifyMailController);
export default authRouter;
