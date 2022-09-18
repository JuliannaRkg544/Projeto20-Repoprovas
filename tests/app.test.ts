import app from "../src/app.js";
import supertest from "supertest";
import * as userfactory from "./factories/authFactory.js"


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
    it("given an invalid input, returns 422", async () => {
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
    
      it("returns 401 for wrong email or password", async () => {
        const login = userfactory.createLogup();
        delete login.passwordConfirmation;
        const user = userfactory.createUser(login);
    
        const response = await supertest(app)
          .post("/signin")
          .send({ ...login, password: "outropassword" });
        expect(response.status).toBe(401);
      });
    
}) //post login 

// describe('Create exam /exam/creation',()=>{}) //post exam

// describe('Get exams by disciplines /exam/get-by-disciplines',()=>{
    
// }) //get exam discipline

// describe('Get exams by teacher /exam/get-by-teacher',()=>{}) //get exam teacher