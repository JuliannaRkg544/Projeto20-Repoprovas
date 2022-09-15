import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidtor.js";

const examsRouter = Router()

examsRouter.use(tokenValidator)

examsRouter.post("/exam-creation")
examsRouter.get("/exam-view-by-discipline")
examsRouter.get("/exam-view-by-teacher")

export default examsRouter;