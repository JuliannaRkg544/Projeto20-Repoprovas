import { Router } from "express";
import { signinUser, signupUser } from "../controllers/authController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import authSchema from "../schemas/authSchema.js";
 
const authRouter = Router()


authRouter.post("/signup", schemaValidator(authSchema),signupUser)
authRouter.post("/sigin", signinUser)

export default authRouter