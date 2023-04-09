import IValidationStrategy from './IValidationStrategy';

class ValidationContext {
    private readonly _strategies: Array<IValidationStrategy>;

    constructor(strategies: Array<IValidationStrategy>) {
        this._strategies = strategies;
    }

    public validate(value: string): string | null {
        for (let strategy of this._strategies) {
            const validationError = strategy.validate(value);
            if (validationError !== null) {
                return validationError;
            }
        }

        return null;
    }
}

export default ValidationContext;