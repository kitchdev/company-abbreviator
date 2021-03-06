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
var fs_1 = require("fs");
var companies_json_1 = __importDefault(require("../../companies.json"));
function nextChar(c) {
    var nextCode = c.charCodeAt(0) + 1;
    console.log(nextCode);
    return String.fromCharCode(nextCode > 90 ? 65 : nextCode);
}
var codesInUse = companies_json_1.default
    .filter(function (_a) {
    var abbreviated_code = _a.abbreviated_code;
    return abbreviated_code.length > 0;
})
    .map(function (_a) {
    var abbreviated_code = _a.abbreviated_code;
    return abbreviated_code;
});
// Talk other ways of doing this, potentially overkill,
// take first characters, shift right, append random character...
function threeLetterPermutations(string) {
    if (string.length < 2)
        return string; // This is our break condition
    var permutations = []; // This array will hold our permutations
    for (var i = 0; i < string.length; i++) {
        var char = string[i];
        var remainingString = string.slice(0, i) + string.slice(i + 1, string.length);
        for (var _i = 0, _a = threeLetterPermutations(remainingString); _i < _a.length; _i++) {
            var subPermutation = _a[_i];
            var abbreviation = (char + subPermutation).slice(0, 3);
            permutations.push(abbreviation);
        }
    }
    return Array.from(new Set(permutations));
}
// need to take a company name and create a unique company code if one does not exist
var createAbrv = function () { return __awaiter(void 0, void 0, void 0, function () {
    var companyJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyJson = companies_json_1.default.map(function (_a) {
                    var name = _a.name, abbreviated_code = _a.abbreviated_code;
                    var companyCode = abbreviated_code;
                    var compressedName = name
                        .replace(/[^a-zA-Z]/gi, "") // remove spaces and special ,haracters
                        .toUpperCase();
                    // before we start heavy process to create permutations, check if first 3 chars will work
                    var firstTryCode = compressedName.slice(0, 3);
                    if (codesInUse.indexOf(firstTryCode) === -1) {
                        companyCode = firstTryCode;
                        codesInUse.push(companyCode);
                    }
                    if (!companyCode) {
                        // Finding all possible permutations for the first 6 chars of company name. 
                        // Slicing cause otherwise way too may permutations runs for very long time.
                        var codeArr = threeLetterPermutations(compressedName.slice(0, 6));
                        codeArr.some(function (code) {
                            if (codesInUse.indexOf(code) >= 0) {
                                return false;
                            }
                            companyCode = code;
                            codesInUse.push(companyCode);
                            return true;
                        });
                        // If no permutations match were naively checking to see if updating the last character of each permut will give us an available code 
                        // and if all else fails we throw an error...
                        if (!companyCode) {
                            var codeFound = codeArr.some(function (code) {
                                var lastChar = code.charAt(2);
                                var codeToTry = code.slice(0, 2) + nextChar(lastChar);
                                if (codesInUse.indexOf(codeToTry) < 0) {
                                    companyCode = codeToTry;
                                    codesInUse.push(companyCode);
                                    return true;
                                }
                            });
                            if (!codeFound) {
                                throw Error("Code not found for company " + name);
                            }
                        }
                    }
                    return {
                        name: name,
                        abbreviated_code: companyCode,
                    };
                });
                return [4 /*yield*/, fs_1.promises.writeFile("companies.json", JSON.stringify(companyJson, null, 2))];
            case 1:
                _a.sent();
                return [2 /*return*/, companyJson];
        }
    });
}); };
createAbrv();
