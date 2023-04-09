"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordLengthValidationStrategy {
    constructor() {
        this._regexPasswordLenght = /^.{6,15}$/;
    }
    validate(value) {
        return !this._regexPasswordLenght.test(value) ? '����� ������ ������ ���� �� 6 �� 15 ��������.' : null;
    }
}
exports.default = PasswordLengthValidationStrategy;
