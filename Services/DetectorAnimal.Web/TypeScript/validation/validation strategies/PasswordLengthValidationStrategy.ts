import IValidationStrategy from '../base/IValidationStrategy';

class PasswordLengthValidationStrategy implements IValidationStrategy {
    private readonly _regexPasswordLenght: RegExp = /^.{6,15}$/;

    public validate(value: string): string | null {
        return !this._regexPasswordLenght.test(value) ? '����� ������ ������ ���� �� 6 �� 15 ��������.' : null;
    }
}

export default PasswordLengthValidationStrategy;