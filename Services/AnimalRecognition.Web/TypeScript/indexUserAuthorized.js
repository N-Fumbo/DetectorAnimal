"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const preloader_1 = __importDefault(require("./preloader"));
const recognitionForm_1 = __importDefault(require("./form/recognitionForm"));
(0, jquery_1.default)(() => {
    (0, recognitionForm_1.default)();
    (0, preloader_1.default)(true);
});
