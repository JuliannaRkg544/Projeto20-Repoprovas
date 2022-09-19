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
import * as examsRepository from "../repositories/examsRepository.js";
function createExam(name, url, category, discipline, teacher) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryId, disciplineId, teacherId, teacherDisciplineId, examdata, exam;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, verifyCategory(category)];
                case 1:
                    categoryId = _a.sent();
                    return [4 /*yield*/, verifyDiscipline(discipline)];
                case 2:
                    disciplineId = _a.sent();
                    return [4 /*yield*/, verifyTeacher(teacher)];
                case 3:
                    teacherId = _a.sent();
                    return [4 /*yield*/, findByDiscplineAndTeacher(disciplineId.id, teacherId.id)];
                case 4:
                    teacherDisciplineId = _a.sent();
                    examdata = {
                        name: name,
                        pdfUrl: url,
                        categoryId: categoryId.id,
                        teacherDisciplineId: teacherDisciplineId.id
                    };
                    return [4 /*yield*/, examsRepository.createExam(examdata)];
                case 5:
                    exam = _a.sent();
                    return [2 /*return*/, exam];
            }
        });
    });
}
function verifyCategory(category) {
    return __awaiter(this, void 0, void 0, function () {
        var isValidCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, examsRepository.findByCategoryName(category)];
                case 1:
                    isValidCategory = _a.sent();
                    if (!isValidCategory) {
                        throw { type: "unprocessable_entity", message: "invalid category" };
                    }
                    return [2 /*return*/, isValidCategory];
            }
        });
    });
}
function verifyDiscipline(discipline) {
    return __awaiter(this, void 0, void 0, function () {
        var isValidDiscipline;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, examsRepository.findByDisciplineName(discipline)];
                case 1:
                    isValidDiscipline = _a.sent();
                    if (!isValidDiscipline) {
                        throw { type: "unprocessable_entity", message: "invalid discipline" };
                    }
                    return [2 /*return*/, isValidDiscipline];
            }
        });
    });
}
function verifyTeacher(teacher) {
    return __awaiter(this, void 0, void 0, function () {
        var isValidTeacher;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, examsRepository.findByTeacheName(teacher)];
                case 1:
                    isValidTeacher = _a.sent();
                    if (!isValidTeacher) {
                        throw { type: "unprocessable_entity", message: "invalid teacher" };
                    }
                    return [2 /*return*/, isValidTeacher];
            }
        });
    });
}
function findByDiscplineAndTeacher(disciplineId, teacherId) {
    return __awaiter(this, void 0, void 0, function () {
        var isValidTeacherAndDisciplineId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, examsRepository.findByTeacherAndDisciplineId(disciplineId, teacherId)];
                case 1:
                    isValidTeacherAndDisciplineId = _a.sent();
                    if (!isValidTeacherAndDisciplineId) {
                        throw { type: "unauthorized", message: "discipline does not belong to this teacher" };
                    }
                    return [2 /*return*/, isValidTeacherAndDisciplineId];
            }
        });
    });
}
function getExamsByDisciplines() {
    return __awaiter(this, void 0, void 0, function () {
        var tests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, examsRepository.selectAllTestsByDiscipline()];
                case 1:
                    tests = _a.sent();
                    return [2 /*return*/, tests];
            }
        });
    });
}
function getExamsByTeacher() {
    return __awaiter(this, void 0, void 0, function () {
        var tests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, examsRepository.selectAllTestsByTeacher()];
                case 1:
                    tests = _a.sent();
                    return [2 /*return*/, tests];
            }
        });
    });
}
export { createExam, getExamsByDisciplines, getExamsByTeacher };
