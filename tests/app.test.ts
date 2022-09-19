import app from "../src/app.js";
import supertest from "supertest";
import * as userfactory from "./factories/authFactory.js"
import * as examfactory from "./factories/examFactory.js"
import client from "../src/config/database.js";


describe('Logup user authentication /signup',()=>{
    it('should create user, given email and password', async()=>{
        const logup = userfactory.createLogup()
        const result = await supertest(app).post("/signup").send(logup) 
        expect(result.status).toBe(201)
    }) 
    it('should return 409 for duplicate logup information', async()=>{
        
        const user = userfactory.createLogup()
        await userfactory.createUser(user)
        const result = await supertest(app).post("/signup").send(user)
        expect(result.status).toBe(409)
    })
    it("should return 422, given an invalid input", async () => {
        const login = userfactory.createLogup();
        delete login.email;
        console.log("logion",login)
    
        const response = await supertest(app).post("/signup").send(login);
        expect(response.status).toBe(422);
      });
})  

describe('Login user authentication /signin',()=>{
   it("should return 400 for empty email or password", async()=>{
    const login = {email:"", password:""}
    const response = await supertest(app).post("/signin").send(login)
    expect(response.status).toBe(422)
   })
    it("should return token for valid input", async () => {
        const login = userfactory.createLogup();
        delete login.passwordConfirmation;
         await userfactory.createUser(login);
         console.log(login)
        const response = await supertest(app).post("/signin").send({
         login
        });
        const token = response.text;
        expect(token).not.toBeNull();
      });
    
      it("should return 401 for wrong email or password", async () => {
        const login = userfactory.createLogup();
        delete login.passwordConfirmation;
        await userfactory.createUser(login);
    
        const response = await supertest(app)
          .post("/signin")
          .send({ ...login, password: "outropassword" });
        expect(response.status).toBe(401);
      });
    
}) 

describe('Create exam /exam/creation',()=>{

  // it("should create exam, given valid inputs", async () => {
  //   const login = userfactory.createLogup();
  //   delete login.passwordConfirmation;
  //   await userfactory.createUser(login);

  //   let result = await supertest(app).post("/signin").send(login);
  //   const token = result.text;

  //   const exam = examfactory.createExam();

  //   result = await supertest(app)
  //     .post("/exam/creation")
  //     .send(exam)
  //     .set("Authorization", `Bearer ${token}`);

  //     console.log("exame ", exam)
  //     expect(result.status).toEqual(201);

  //   const savedTest = await client.tests.findFirst({
  //     where: {name: exam.name},
  //   });

  //   expect(exam.name).toBe(savedTest.name);
  // });
  it("should return 422 for empty fields ", async()=>{
    const login = userfactory.createLogup();
    delete login.passwordConfirmation;
    await userfactory.createUser(login);

    let result = await supertest(app).post("/signin").send({
      login
     });
     const token = result.text;

    const exam = examfactory.createExam()
    delete exam.name

    result = await supertest(app).post("/exam/creation").send(exam).set("Authorization", `Bearer ${token}`)
    expect(result.status).toBe(422)
   })

   it("should return 401 given no token", async () => {
    const exam = examfactory.createExam();
    let result = await supertest(app).post("/exam/creation").send(exam);
    expect(result.status).toEqual(401);
  });

it("should return 404, given invalid token", async () => {
    const token = "invalidtoken";
    const exam = examfactory.createExam();

    let response = await supertest(app)
      .post("/exam/creation")
      .send(exam)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(404);
  });


}) //post exam

describe('Get exams by disciplines /exam/get-by-disciplines',async ()=>{
  it("given valid inputs, get tests by discipline", async () => {
    const login = userFactory.createLogin();
    delete login.confirmPassword;
    await userFactory.createUser(login);

    let response = await supertest(app).post("/sign-in").send(login);
    const token = response.text;

    const test = testFactory.createTestInfo();

    response = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", `Bearer ${token}`);

    response = await supertest(app)
      .get("/tests/disciplines")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).not.toBeNull();
    expect(response.status).toEqual(200);
  });
  it("given no token, returns 401", async () => {
    const login = userFactory.createLogin();
    delete login.confirmPassword;
    await userFactory.createUser(login);

    let response = await supertest(app).post("/sign-in").send(login);
    const token = response.text;

    const test = testFactory.createTestInfo();

    response = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", `Bearer ${token}`);

    response = await supertest(app).get("/tests/disciplines");

    expect(response.status).toEqual(401);
  });

  it("given invalid token, returns 404", async () => {
    const login = userFactory.createLogin();
    delete login.confirmPassword;
    await userFactory.createUser(login);

    let response = await supertest(app).post("/sign-in").send(login);
    const token = response.text;

    const test = testFactory.createTestInfo();

    response = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", `Bearer ${token}`);

    const INVALID_TOKEN = "invalidtoken";
    response = await supertest(app)
      .get("/tests/disciplines")
      .set("Authorization", `Bearer ${INVALID_TOKEN}`);

    expect(response.status).toEqual(404);
  });
}) //get exam discipline

// describe('Get exams by teacher /exam/get-by-teacher',()=>{}) //get exam teacher