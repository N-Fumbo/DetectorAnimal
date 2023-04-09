import IValidationStrategy from '../base/IValidationStrategy';

class RequiredValidatorStrategy implements IValidationStrategy {
    public validate(value: string): string | null {
        return value.trim() === '' ? 'Это поле не может быть пустым.' : null;
    }
}

export default RequiredValidatorStrategy;