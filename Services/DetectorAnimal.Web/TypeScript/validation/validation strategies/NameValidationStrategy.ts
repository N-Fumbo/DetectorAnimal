import IValidationStrategy from '../base/IValidationStrategy';

class NameValidationStrategy implements IValidationStrategy {
    private readonly _regexName: RegExp = /^[a-zA-Z�-��-�]{2,40}$/;

    public validate(value: string): string | null {
        return !this._regexName.test(value) ? '������� ���������� ���.' : null;
    }
}

export default NameValidationStrategy;