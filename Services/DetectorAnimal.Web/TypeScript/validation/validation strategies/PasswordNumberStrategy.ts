import IValidationStrategy from '../base/IValidationStrategy';

class PasswordNumberStrategy implements IValidationStrategy {
    private readonly _regexPasswordNumber: RegExp = /[0-9]/;

    public validate(value: string): string | null {
        return !this._regexPasswordNumber.test(value) ? '������ ������ ��������� ���� �� ���� �����.' : null;
    }
}

export default PasswordNumberStrategy;