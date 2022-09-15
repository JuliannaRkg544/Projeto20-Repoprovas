import * as examsRepository from "../repositories/examsRepository.js";

async function createExam(
  name: string,
  url: string,
  category: string,
  discipline: string,
  teacher: string
) {
  //verificar validade de category, discipline and teacher
  const categoryId = await verifyCategory(category);
  const disciplineId = await verifyDiscipline(discipline);
  const teacherId = await verifyTeacher(teacher);

  const teacherDisciplineId = await findByDiscplineAndTeacher(disciplineId.id, teacherId.id);

  const examdata: examsRepository.TestData = {
    name,
    pdfUrl: url,
    categoryId: categoryId.id,
    teacherDisciplineId:teacherDisciplineId.id
  };
  await examsRepository.createExam(examdata)
}

async function verifyCategory(category: string) {
  const isValidCategory = await examsRepository.findByCategoryName(category);

  if (!isValidCategory) {
    console.log(isValidCategory);
    throw { type: "unprocessable_entity", message: "invalid category" };
  }
  return isValidCategory;
}
async function verifyDiscipline(discipline: string) {
  const isValidDiscipline = await examsRepository.findByDisciplineName(
    discipline
  );
  if (!isValidDiscipline) {
    throw { type: "unprocessable_entity", message: "invalid discipline" };
  }
  return isValidDiscipline;
}
async function verifyTeacher(teacher: string) {
  const isValidTeacher = await examsRepository.findByTeacheName(teacher);
  if (!isValidTeacher) {
    throw { type: "unprocessable_entity", message: "invalid teacher" };
  }
  return isValidTeacher;
}

async function findByDiscplineAndTeacher(
  disciplineId: number,
  teacherId: number
) {
  const isValidTeacherAndDisciplineId =
    await examsRepository.findByTeacherAndDisciplineId(disciplineId, teacherId);
    if(!isValidTeacherAndDisciplineId){
        throw{type:"unauthorized", message:"discipline does not belong to this teacher"}
    }
    return isValidTeacherAndDisciplineId
}

async function getExamsByDisciples() {}

async function getExamesyTeacher() {}

export { createExam, getExamsByDisciples, getExamesyTeacher };
