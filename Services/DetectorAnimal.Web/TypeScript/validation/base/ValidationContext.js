"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationContext {
    constructor(strategies) {
        this._strategies = strategies;
    }
    validate(value) {
        for (let strategy of this._strategies) {
            const validationError = strategy.validate(value);
            if (validationError !== null) {
                return validationError;
            }
        }
        return null;
    }
}
exports.default = ValidationContext;
