import { Router } from "express";
import { createExam, getExamsByDisciples, getExamsByTeachers } from "../controllers/examController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import examSchema from "../schemas/examSchema.js";
const examsRouter = Router()
 
// examsRouter.use(tokenValidator)

examsRouter.post("/exam/creation", schemaValidator(examSchema), createExam)
examsRouter.get("/exams/discipline", getExamsByDisciples)
examsRouter.get("/exams/teacher", getExamsByTeachers)

export default examsRouter;