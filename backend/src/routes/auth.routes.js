import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { registerController } from "../controllers/auth.controller.js";




const authRouter = Router()


authRouter.post('/register',registerValidator,registerController)


 
export default authRouter