var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import app from "../src/app.js";
import supertest from "supertest";
import * as userfactory from "./factories/authFactory.js";
import * as examfactory from "./factories/examFactory.js";
import client from "../src/config/database.js";
// describe('Logup user authentication /signup',()=>{
//     it('should create user, given email and password', async()=>{
//         const logup = userfactory.createLogup()
//         const result = await supertest(app).post("/signup").send(logup) 
//         expect(result.status).toBe(201)
//     }) 
//     it('should return 409 for duplicate logup information', async()=>{
//         const user = userfactory.createLogup()
//         await userfactory.createUser(user)
//         const result = await supertest(app).post("/signup").send(user)
//         expect(result.status).toBe(409)
//     })
//     it("should return 422, given an invalid input", async () => {
//         const login = userfactory.createLogup();
//         delete login.email;
//         console.log("logion",login)
//         const response = await supertest(app).post("/signup").send(login);
//         expect(response.status).toBe(422);
//       });
// })  
// describe('Login user authentication /signin',()=>{
//    it("should return 400 for empty email or password", async()=>{
//     const login = {email:"", password:""}
//     const response = await supertest(app).post("/signin").send(login)
//     expect(response.status).toBe(422)
//    })
//     it("should return token for valid input", async () => {
//         const login = userfactory.createLogup();
//         delete login.passwordConfirmation;
//          await userfactory.createUser(login);
//          console.log(login)
//         const response = await supertest(app).post("/signin").send({
//          login
//         });
//         const token = response.text;
//         expect(token).not.toBeNull();
//       });
//       it("should return 401 for wrong email or password", async () => {
//         const login = userfactory.createLogup();
//         delete login.passwordConfirmation;
//         await userfactory.createUser(login);
//         const response = await supertest(app)
//           .post("/signin")
//           .send({ ...login, password: "outropassword" });
//         expect(response.status).toBe(401);
//       });
// }) 
describe('Create exam /exam/creation', function () {
    it("should create exam, given valid inputs", function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, result, token, exam, savedTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userfactory.createLogup();
                    delete login.passwordConfirmation;
                    return [4 /*yield*/, userfactory.createUser(login)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/signin").send(login)];
                case 2:
                    result = _a.sent();
                    token = result.text;
                    exam = examfactory.createExam();
                    return [4 /*yield*/, supertest(app)
                            .post("/exam/creation")
                            .send(exam)
                            .set("Authorization", "Bearer ".concat(token))];
                case 3:
                    result = _a.sent();
                    console.log("exame ", exam);
                    expect(result.status).toEqual(201);
                    return [4 /*yield*/, client.tests.findFirst({
                            where: { name: exam.name }
                        })];
                case 4:
                    savedTest = _a.sent();
                    expect(exam.name).toBe(savedTest.name);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 422 for empty fields ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, result, token, exam;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userfactory.createLogup();
                    delete login.passwordConfirmation;
                    return [4 /*yield*/, userfactory.createUser(login)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/signin").send({
                            login: login
                        })];
                case 2:
                    result = _a.sent();
                    token = result.text;
                    console.log("TOKEN ", token);
                    exam = examfactory.createExam();
                    delete exam.name;
                    return [4 /*yield*/, supertest(app).post("/exam/creation").send(exam).set("Authorization", "Bearer ".concat(token))];
                case 3:
                    result = _a.sent();
                    expect(result.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 401 given no token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var exam, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exam = examfactory.createExam();
                    return [4 /*yield*/, supertest(app).post("/exam/creation").send(exam)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 404, given invalid token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, exam, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = "invalidtoken";
                    exam = examfactory.createExam();
                    return [4 /*yield*/, supertest(app)
                            .post("/exam/creation")
                            .send(exam)
                            .set("Authorization", "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
}); //post exam
// describe('Get exams by disciplines /exam/get-by-disciplines',async ()=>{
//   it("given valid inputs, get tests by discipline", async () => {
//     const login = userFactory.createLogin();
//     delete login.confirmPassword;
//     await userFactory.createUser(login);
//     let response = await supertest(app).post("/sign-in").send(login);
//     const token = response.text;
//     const test = testFactory.createTestInfo();
//     response = await supertest(app)
//       .post("/tests")
//       .send(test)
//       .set("Authorization", `Bearer ${token}`);
//     response = await supertest(app)
//       .get("/tests/disciplines")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.body).not.toBeNull();
//     expect(response.status).toEqual(200);
//   });
//   it("given no token, returns 401", async () => {
//     const login = userFactory.createLogin();
//     delete login.confirmPassword;
//     await userFactory.createUser(login);
//     let response = await supertest(app).post("/sign-in").send(login);
//     const token = response.text;
//     const test = testFactory.createTestInfo();
//     response = await supertest(app)
//       .post("/tests")
//       .send(test)
//       .set("Authorization", `Bearer ${token}`);
//     response = await supertest(app).get("/tests/disciplines");
//     expect(response.status).toEqual(401);
//   });
//   it("given invalid token, returns 404", async () => {
//     const login = userFactory.createLogin();
//     delete login.confirmPassword;
//     await userFactory.createUser(login);
//     let response = await supertest(app).post("/sign-in").send(login);
//     const token = response.text;
//     const test = testFactory.createTestInfo();
//     response = await supertest(app)
//       .post("/tests")
//       .send(test)
//       .set("Authorization", `Bearer ${token}`);
//     const INVALID_TOKEN = "invalidtoken";
//     response = await supertest(app)
//       .get("/tests/disciplines")
//       .set("Authorization", `Bearer ${INVALID_TOKEN}`);
//     expect(response.status).toEqual(404);
//   });
// }) //get exam discipline
// // describe('Get exams by teacher /exam/get-by-teacher',()=>{}) //get exam teacher
