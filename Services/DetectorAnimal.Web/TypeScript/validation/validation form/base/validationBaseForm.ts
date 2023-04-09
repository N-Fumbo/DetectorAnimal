import IValidationStrategy from '../../base/IValidationStrategy';
import ValidationContext from '../../base/ValidationContext';
import RequiredValidatorStrategy from '../../validation strategies/RequiredValidatorStrategy';
import NameValidationStrategy from '../../validation strategies/NameValidationStrategy';
import EmailValidationStrategy from '../../validation strategies/EmailValidationStrategy';
import PasswordLengthValidationStrategy from '../../validation strategies/PasswordLengthValidationStrategy';
import PasswordNumberStrategy from '../../validation strategies/PasswordNumberStrategy';
import PasswordCapitalLetterStrategy from '../../validation strategies/PasswordCapitalLetterStrategy';
import ConfirmationPasswordValidationStrategy from '../../validation strategies/ConfirmationPasswordValidationStrategy';
import $ from 'jquery';

function validate(value: string | null, errorResult: JQuery<HTMLElement>, stategies: Array<IValidationStrategy>): boolean {
    if (value !== null) {
        const context = new ValidationContext(stategies);
        const error = context.validate(value);
        if (error !== null) {
            errorResult.text(error);
            return false;
        }
        else {
            errorResult.empty();
            return true;
        }
    }
    return false;
}

function validateName() {
    return validate($('#Name').val()?.toString() ?? null, $('error_name'), [new RequiredValidatorStrategy(), new NameValidationStrategy()]);
}