import IValidationStrategy from '../base/IValidationStrategy';

class EmailValidationStrategy implements IValidationStrategy {
    private readonly _regexEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    public validate(value: string): string | null {
        return !this._regexEmail.test(value) ? '������� ���������� email �����.' : null;
    }
}

export default EmailValidationStrategy;