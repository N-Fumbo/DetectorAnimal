"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationContext_1 = __importDefault(require("../../base/ValidationContext"));
const RequiredValidatorStrategy_1 = __importDefault(require("../../validation strategies/RequiredValidatorStrategy"));
const NameValidationStrategy_1 = __importDefault(require("../../validation strategies/NameValidationStrategy"));
const jquery_1 = __importDefault(require("jquery"));
function validate(value, errorResult, stategies) {
    if (value !== null) {
        const context = new ValidationContext_1.default(stategies);
        const error = context.validate(value);
        if (error !== null) {
            errorResult.text(error);
            return false;
        }
        else {
            errorResult.empty();
            return true;
        }
    }
    return false;
}
function validateName() {
    var _a, _b;
    return validate((_b = (_a = (0, jquery_1.default)('#Name').val()) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : null, (0, jquery_1.default)('error_name'), [new RequiredValidatorStrategy_1.default(), new NameValidationStrategy_1.default()]);
}
