//name, url, category,discipline,teacher
import { faker } from "@faker-js/faker"
export function createExam(){
  return{
    name: faker.name.jobTitle(),
    url: faker.internet.url(),
    category: "Prática" ,
    discipline: "Autoconfiança",
    teacher: "Bruna Hamori"
  }
}
interface ExamType {
  name: string,
  url: string,
  category:string,
  discipline: string,
  teacher: string
}
export async function insertExam(exam:ExamType){
    
}