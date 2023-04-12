"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
(0, jquery_1.default)(() => {
    (0, jquery_1.default)('#form_register').on('submit', function (e) {
        e.preventDefault();
        const formData = (0, jquery_1.default)(this).serialize();
        console.log(formData);
    });
});
