"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NameValidationStrategy {
    constructor() {
        this._regexName = /^[a-zA-Z�-��-�]{2,40}$/;
    }
    validate(value) {
        return !this._regexName.test(value) ? '������� ���������� ���.' : null;
    }
}
exports.default = NameValidationStrategy;
