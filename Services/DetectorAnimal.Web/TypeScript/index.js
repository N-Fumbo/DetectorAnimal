"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preloader_1 = __importDefault(require("./preloader"));
const jquery_1 = __importDefault(require("jquery"));
const registerForm_1 = __importDefault(require("./form/registerForm"));
(0, jquery_1.default)(() => {
    (0, registerForm_1.default)();
    (0, preloader_1.default)();
});
