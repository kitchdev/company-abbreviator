"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = void 0;
var fs_1 = require("fs");
var companies_json_1 = __importDefault(require("../../companies.json"));
var companyNameList = companies_json_1.default.map(function (company) { return company.name; });
var companyCodeList = companies_json_1.default.map(function (company) { return company.abbreviated_code; });
var createCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newCompany, compNameExists, compAbrExists, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newCompany = req.body.company;
                console.log(newCompany.name.length);
                if (!newCompany.name || newCompany.name.length < 3) {
                    res.status(422).send({
                        status: "failure",
                        message: "You must provide a company name, and it must be at least 3 characters long",
                    });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                compNameExists = companyNameList.find(function (name) { return name === newCompany.name; });
                compAbrExists = companyCodeList.find(function (code) { return code === newCompany.abbreviated_code; });
                if (compNameExists || compAbrExists) {
                    res.status(422).send({
                        status: "failure",
                        message: "This company name or abbreviated code already exists",
                    });
                    return [2 /*return*/];
                }
                // mutate existing company and overwrite our data file
                companies_json_1.default.push(newCompany);
                return [4 /*yield*/, fs_1.promises.writeFile("companies.json", JSON.stringify(companies_json_1.default, null, 2))];
            case 2:
                _a.sent();
                res.status(200).send(companies_json_1.default);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send({
                    status: "failure",
                    message: "an Error occured while trying to insert company",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCompany = createCompany;
