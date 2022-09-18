//name, url, category,discipline,teacher
import { faker } from "@faker-js/faker"
export function createExam(){
  return{
    name: faker.name.jobTitle(),
    url: faker.internet.url(),
    category: faker.name.jobArea(),
    discipline: faker.name.jobType(),
    teacher: faker.name.firstName()
  }
}
export function insertExam(){
    
}