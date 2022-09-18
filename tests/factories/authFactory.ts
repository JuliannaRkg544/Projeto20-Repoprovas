import { faker } from "@faker-js/faker";
import client from "../../src/config/database.js";

export function createLogup() {
  const password = faker.internet.password(10);
  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
}
interface Login {
  email: string;
  password: string;
}
export async function createUser(login: Login) {
  const user = await client.users.create({
    data: { email: login.email, password: login.password },
  });
  return user
}
