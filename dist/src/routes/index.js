import { Router } from "express";
// import errorHandler from "../middlewares/errorHandler.js";
import authRouter from "./authRouter.js";
import examsRouter from "./examsRouter.js";
var router = Router();
// router.use(errorHandler)
router.use(authRouter);
router.use(examsRouter);
export default router;
