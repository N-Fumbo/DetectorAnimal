import IValidationStrategy from '../base/IValidationStrategy';

class NameValidationStrategy implements IValidationStrategy {
    private readonly _regexName: RegExp = /^[a-zA-Zа-€ј-я]{2,40}$/;

    public validate(value: string): string | null {
        return !this._regexName.test(value) ? '¬ведите корректное им€.' : null;
    }
}

export default NameValidationStrategy;