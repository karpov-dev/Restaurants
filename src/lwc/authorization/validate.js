import invalidEmailLabel from '@salesforce/label/c.Invalid_Email_Format';

import {DomService} from "c/domService";
import {ValidationService} from "c/validationService";

export class validate {
    static parsingInputs(event, user) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        if (fieldName === 'email') {
            user.email = fieldValue;
        }

        if (fieldName === 'password') {
            user.password = fieldValue;
        }
    }

    static isValidEmail(owner) {
        const emailInput = DomService.getElementByDataId('email', owner);
        const isValidPattern = ValidationService.isValidEmail(owner.user.email);

        if (!isValidPattern) emailInput.setCustomValidity(invalidEmailLabel);
        else emailInput.setCustomValidity('');

        return isValidPattern;
    }

    static isValidData(owner) {
        const passwordInput = DomService.getElementByDataId('password', owner);

        return this.isValidEmail(owner) && passwordInput.checkValidity();
    }
}