import IValidationStrategy from '../base/IValidationStrategy';

class PasswordCapitalLetterStrategy implements IValidationStrategy {
    private readonly _regexPasswordCapitalLetter: RegExp = /[A-Z�-�]/;

    public validate(value: string): string | null {
        return !this._regexPasswordCapitalLetter.test(value) ? '������ ������ ��������� ���� �� ���� ��������� �����.' : null;
    }
}

export default PasswordCapitalLetterStrategy;