"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordNumberStrategy {
    constructor() {
        this._regexPasswordNumber = /[0-9]/;
    }
    validate(value) {
        return !this._regexPasswordNumber.test(value) ? '������ ������ ��������� ���� �� ���� �����.' : null;
    }
}
exports.default = PasswordNumberStrategy;
