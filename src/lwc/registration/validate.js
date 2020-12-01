import {DomService} from "c/domService";
import {ValidationService} from "c/validationService";
import {AuthorizationService} from "c/authorizationService";

export class validate {
    static parent;

    static autogenerateUserName() {
        const user = this.parent.user;

        if (user.firstName && user.lastName) {
            user.userName = user.firstName + '.' + user.lastName;
        }
    }

    static parsingInput(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const user = this.parent.user;

        if (fieldName === 'firstName' || fieldName === 'lastName') {
            if (fieldName === 'firstName') {
                user.firstName = fieldValue;
            }
            if (fieldName === 'lastName') {
                user.lastName = fieldValue;
            }
            validate.autogenerateUserName();
        }

        if (fieldName === 'userName') {
            user.userName = fieldValue;
        }

        if (fieldName === 'password') {
            user.password = fieldValue;
            this.isValidPasswords();
        }

        if (fieldName === 'repeatPassword') {
            this.parent.repeatPassword = fieldValue;
            this.isValidPasswords();
        }

        if (fieldName === 'email') {
            user.email = fieldValue;
        }

        if (fieldName === 'mobilePhone') {
            user.mobilePhone = fieldValue;
            this.isValidPhone();
        }
    }

    static isValidEmail() {
        const email = DomService.getElementByDataId('email', this.parent);
        const isValidEmailTemplate = ValidationService.isValidEmail(this.parent.user.email);

        if(!isValidEmailTemplate) email.setCustomValidity('Invalid Email format');
        else email.setCustomValidity('');

        return isValidEmailTemplate;
    }

    static isValidPhone() {
        const phoneInput = DomService.getElementByDataId('phone', this.parent);
        const isValidPhoneFormat = ValidationService.isValidPhone(this.parent.user.mobilePhone);

        if (!isValidPhoneFormat) phoneInput.setCustomValidity('Invalid phone format');
        else phoneInput.setCustomValidity('');

        return isValidPhoneFormat;
    }


    static isValidPasswords() {
        const repeatPassword = DomService.getElementByDataId('repeatPassword', this.parent);
        const isPasswordEqual = this.parent.user.password === this.parent.repeatPassword;

        if (!isPasswordEqual) repeatPassword.setCustomValidity('Passwords must be equal');
        else repeatPassword.setCustomValidity('');

        return isPasswordEqual;
    }


    static isValidData() {
        const firstNameValidity = DomService.getElementByDataId('firstName', this.parent).checkValidity();
        const lastNameValidity = DomService.getElementByDataId('lastName', this.parent).checkValidity();
        const userNameValidity = DomService.getElementByDataId('userName', this.parent).checkValidity();
        const passwordValidity = DomService.getElementByDataId('password', this.parent).checkValidity();

        return firstNameValidity && lastNameValidity && userNameValidity && passwordValidity &&
            passwordValidity && this.isValidEmail() && this.isValidPasswords();
    }

    static async isAvailableEmail() {
        const isAvailable = await AuthorizationService.isAvailableEmail(this.parent.user.email, this.parent);
        const emailInput = DomService.getElementByDataId('email', this.parent);

        if (!isAvailable) emailInput.setCustomValidity('Email is Unavailable');
        else emailInput.setCustomValidity('');

        return isAvailable;
    }
}