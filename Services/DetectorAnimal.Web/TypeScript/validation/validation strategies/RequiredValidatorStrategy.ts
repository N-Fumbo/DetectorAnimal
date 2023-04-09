import IValidationStrategy from '../base/IValidationStrategy';

class RequiredValidatorStrategy implements IValidationStrategy {
    public validate(value: string): string | null {
        return value.trim() === '' ? '��� ���� �� ����� ���� ������.' : null;
    }
}

export default RequiredValidatorStrategy;