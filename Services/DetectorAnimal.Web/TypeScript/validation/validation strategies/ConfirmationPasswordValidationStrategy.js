"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfirmationPasswordValidationStrategy {
    constructor(confirmPassword) {
        this._confirmPassword = confirmPassword;
    }
    validate(value) {
        return value !== this._confirmPassword ? '������ �� ���������' : null;
    }
}
exports.default = ConfirmationPasswordValidationStrategy;
