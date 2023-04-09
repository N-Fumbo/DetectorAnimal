"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailValidationStrategy {
    constructor() {
        this._regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    }
    validate(value) {
        return !this._regexEmail.test(value) ? '������� ���������� email �����.' : null;
    }
}
exports.default = EmailValidationStrategy;
