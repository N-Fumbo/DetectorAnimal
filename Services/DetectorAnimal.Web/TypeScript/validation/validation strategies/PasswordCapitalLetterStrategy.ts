import IValidationStrategy from '../base/IValidationStrategy';

class PasswordCapitalLetterStrategy implements IValidationStrategy {
    private readonly _regexPasswordCapitalLetter: RegExp = /[A-ZА-Я]/;

    public validate(value: string): string | null {
        return !this._regexPasswordCapitalLetter.test(value) ? 'Пароль должен содержать хотя бы одну заглавную букву.' : null;
    }
}

export default PasswordCapitalLetterStrategy;