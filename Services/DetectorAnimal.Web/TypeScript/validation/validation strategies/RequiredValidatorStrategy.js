"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequiredValidatorStrategy {
    validate(value) {
        return value.trim() === '' ? '��� ���� �� ����� ���� ������.' : null;
    }
}
exports.default = RequiredValidatorStrategy;
