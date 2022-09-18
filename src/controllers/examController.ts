import { Request, Response } from "express";
import * as examService from "../services/examService.js";

export async function createExam(req: Request, res: Response) {
  const {
    name,
    url,
    category,
    discipline,
    teacher,
  }: {
    name: string;
    url: string;
    category: string;
    discipline: string;
    teacher: string;
  } = req.body;
  const exam = await examService.createExam(
    name,
    url,
    category,
    discipline,
    teacher
  );
  
  res.status(201).send(exam);
}

export async function getExamsByDisciples(req: Request, res: Response) {

  const exams = await examService.getExamsByDisciplines()
  res.status(200).send(exams)
}

export async function getExamsByTeachers(req: Request, res: Response) {
  const exams = await examService.getExamsByTeacher()
  res.status(200).send(exams)
}
