var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
describe('Logup user authentication /signup', function () {
    it('should create user, given email and password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logup, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logup = userfactory.createLogup();
                    return [4 /*yield*/, supertest(app).post("/signup").send(logup)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 409 for duplicate logup information', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = userfactory.createLogup();
                    return [4 /*yield*/, userfactory.createUser(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/signup").send(user)];
                case 2:
                    result = _a.sent();
                    expect(result.status).toBe(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it("given an invalid input, returns 422", function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userfactory.createLogup();
                    delete login.email;
                    console.log("logion", login);
                    return [4 /*yield*/, supertest(app).post("/signup").send(login)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Login user authentication /signin', function () {
    it("should return 400 for empty email or password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = { email: "", password: "" };
                    return [4 /*yield*/, supertest(app).post("/signin").send(login)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return token for valid input", function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userfactory.createLogup();
                    delete login.passwordConfirmation;
                    return [4 /*yield*/, userfactory.createUser(login)];
                case 1:
                    _a.sent();
                    console.log(login);
                    return [4 /*yield*/, supertest(app).post("/signin").send({
                            login: login
                        })];
                case 2:
                    response = _a.sent();
                    token = response.text;
                    expect(token).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns 401 for wrong email or password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userfactory.createLogup();
                    delete login.passwordConfirmation;
                    user = userfactory.createUser(login);
                    return [4 /*yield*/, supertest(app)
                            .post("/signin")
                            .send(__assign(__assign({}, login), { password: "outropassword" }))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
}); //post login 
// describe('Create exam /exam/creation',()=>{}) //post exam
// describe('Get exams by disciplines /exam/get-by-disciplines',()=>{
// }) //get exam discipline
// describe('Get exams by teacher /exam/get-by-teacher',()=>{}) //get exam teacher
