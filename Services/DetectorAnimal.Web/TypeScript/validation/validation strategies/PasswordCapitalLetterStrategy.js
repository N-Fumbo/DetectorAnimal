"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordCapitalLetterStrategy {
    constructor() {
        this._regexPasswordCapitalLetter = /[A-Z�-�]/;
    }
    validate(value) {
        return !this._regexPasswordCapitalLetter.test(value) ? '������ ������ ��������� ���� �� ���� ��������� �����.' : null;
    }
}
exports.default = PasswordCapitalLetterStrategy;
