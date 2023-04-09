import IValidationStrategy from '../base/IValidationStrategy';

class PasswordLengthValidationStrategy implements IValidationStrategy {
    private readonly _regexPasswordLenght: RegExp = /^.{6,15}$/;

    public validate(value: string): string | null {
        return !this._regexPasswordLenght.test(value) ? 'Длина пароля должна быть от 6 до 15 символов.' : null;
    }
}

export default PasswordLengthValidationStrategy;