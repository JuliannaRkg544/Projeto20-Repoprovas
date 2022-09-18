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
import client from "../src/config/database.js";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var terms, categories, teachers, disciplines, teachersDisciplines;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    terms = [
                        { number: 1 },
                        { number: 2 },
                        { number: 3 },
                        { number: 4 },
                        { number: 5 },
                        { number: 6 },
                    ];
                    categories = [
                        { name: "Projeto" },
                        { name: "Prática" },
                        { name: "Recuperação" },
                    ];
                    teachers = [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }];
                    disciplines = [
                        { name: "HTML e CSS", termId: 1 },
                        { name: "JavaScript", termId: 2 },
                        { name: "React", termId: 3 },
                        { name: "Humildade", termId: 4 },
                        { name: "Planejamento", termId: 5 },
                        { name: "Autoconfiança", termId: 6 },
                    ];
                    teachersDisciplines = [
                        { teacherId: 1, disciplineId: 1 },
                        { teacherId: 1, disciplineId: 2 },
                        { teacherId: 1, disciplineId: 3 },
                        { teacherId: 2, disciplineId: 4 },
                        { teacherId: 2, disciplineId: 5 },
                        { teacherId: 2, disciplineId: 6 },
                    ];
                    return [4 /*yield*/, client.terms.createMany({ data: terms })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.categories.createMany({ data: categories })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.teachers.createMany({ data: teachers })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, client.disciplines.createMany({ data: disciplines })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, client.teachersDisciplines.createMany({ data: teachersDisciplines })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.log(e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
