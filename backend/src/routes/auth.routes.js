import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { registerController, verifyEmailController } from "../controllers/auth.controller.js";




const authRouter = Router()


authRouter.post('/register',registerValidator,registerController)




authRouter.get('/verify-email',verifyEmailController)


 
export default authRouter