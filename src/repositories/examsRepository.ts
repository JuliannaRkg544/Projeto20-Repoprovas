import { Tests } from "@prisma/client";
import client from "../config/database.js";

export type TestData = Omit<Tests, "id">;

async function createExam(testdata: TestData) {
  await client.tests.create({
    data: testdata,
  });
}

async function findByCategoryName(category: string) {
  return await client.categories.findFirst({
    where: {
      name: {
        equals: category,
        mode: "insensitive",
      },
    },
  });
}

async function findByDisciplineName(discipline: string) {
  return await client.disciplines.findFirst({
    where: {
      name: {
        equals: discipline,
        mode: "insensitive",
      },
    },
  });
}

async function findByTeacheName(teacher: string) {
  return await client.teachers.findFirst({
    where: {
      name: {
        equals: teacher,
        mode: "insensitive",
      },
    },
  });
}

async function findByTeacherAndDisciplineId(
  disciplineId: number,
  teacherId: number
) {
  return await client.teachersDisciplines.findFirst({
    where: {
      AND: [{ teacherId }, { disciplineId }],
    },
  });
}

async function selectAllTestsByDiscipline() {
  return await client.terms.findMany({
    select: {
      number: true,
      discipline: {
        select: {
          id: true,
          name: true,
          teachersDisciplines: {
            select: {
              teacher: { select: { name: true } },
              test: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
  });
}

async function selectAllTestsByTeacher() {
  return await client.teachers.findMany({
    select: {
      id: true,
      name: true,
      teacherDiscipline: {
        select: {
          discipline: {
            select: {
              name: true,
              term: { select: { number: true } },
            },
          },
          test: {
            select: {
              name: true,
              pdfUrl: true,
              category: { select: { name: true } },
            },
          },
        },
      },
    },
  })
}

export {
  createExam,
  findByCategoryName,
  findByDisciplineName,
  findByTeacheName,
  findByTeacherAndDisciplineId,
  selectAllTestsByDiscipline,
  selectAllTestsByTeacher

};
