import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { loginController, registerController, verifyEmailController } from "../controllers/auth.controller.js";




const authRouter = Router()


authRouter.post('/register',registerValidator,registerController)


authRouter.post('/login',loginValidator,loginController)


authRouter.get('/verify-email',verifyEmailController)


 
export default authRouter