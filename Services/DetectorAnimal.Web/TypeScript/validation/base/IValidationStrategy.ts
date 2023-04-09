interface IValidationStrategy {
    validate(value: string): string | null;
}

export default IValidationStrategy;