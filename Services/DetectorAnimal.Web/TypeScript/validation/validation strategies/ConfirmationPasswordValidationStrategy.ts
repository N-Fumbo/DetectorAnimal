import IValidationStrategy from '../base/IValidationStrategy';

class ConfirmationPasswordValidationStrategy implements IValidationStrategy {

    private readonly _confirmPassword: string;

    constructor(confirmPassword: string) {
        this._confirmPassword = confirmPassword;
    }

    public validate(value: string): string | null {
        return value !== this._confirmPassword ? 'Пароли не совпадают' : null;
    }
}

export default ConfirmationPasswordValidationStrategy;