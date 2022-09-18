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
        //criar um usuario
        //inserir no banco 
        // fazer a request
        const user = userfactory.createLogup()
        await userfactory.createUser(user)
        const result = await supertest(app).post("/signup").send(user)
        expect(result.status).toBe(409)
    })
})  //post logup

describe('Login user authentication /signin',()=>{}) //post login 

describe('Create exam /',()=>{}) //post exam

describe('Get exams by disciplines',()=>{}) //get exam discipline

describe('Get exams by teacher',()=>{}) //get exam teacher