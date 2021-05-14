"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var createCompany_1 = require("./controllers/createCompany");
// Create a new express app instance
var port = 3000;
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.post('/create-company', createCompany_1.createCompany);
app.listen(port, function () { return console.log('App is listening on port 3000!'); });
