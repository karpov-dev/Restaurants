import {LightningElement, track, api} from 'lwc';

import {validate} from "./validate";

import {EventService} from "c/eventService";
import {AuthorizationService} from "c/authorizationService";

import authorizationLabel from "@salesforce/label/c.Authorization";
import emailLabel from "@salesforce/label/c.Email";
import emailPlaceholderLabel from "@salesforce/label/c.Email_Placeholder";
import passwordLabel from "@salesforce/label/c.Password";
import signInLabel from "@salesforce/label/c.Sign_In";
import invalidLoginLabel from '@salesforce/label/c.Invalid_Login';
import invalidLoginOrPasswordLabel from '@salesforce/label/c.Invalid_Login_Or_Password';
import successLabel from '@salesforce/label/c.Success';
import successLoginLabel from '@salesforce/label/c.Successful_login';

export default class Authorization extends LightningElement {
    label = {
        authorizationLabel, emailLabel, emailPlaceholderLabel,
        passwordLabel, signInLabel
    }

    @track user = {
        email: '',
        password: ''
    }
    singInButtonDisabled = true;

    valueHandler(event) {
        validate.parsingInputs(event, this.user);
        this.singInButtonDisabled = !validate.isValidData(this);
    }

    async signIn(event) {
        EventService.spinnerEvt(true, this);
        const contactId = await AuthorizationService.signIn(this.user.email, this.user.password, this);
        EventService.spinnerEvt(false, this);

        if (contactId) {
            EventService.loginEvt(contactId, this);
            EventService.showToastEvt(successLabel, successLoginLabel, 'success', this);
        } else {
            EventService.invalidLoginEvt(this);
            EventService.showToastEvt(invalidLoginLabel, invalidLoginOrPasswordLabel, 'warning', this);
        }
    }
}