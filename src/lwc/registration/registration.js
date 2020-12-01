import {LightningElement, track} from 'lwc';

import {EventService} from "c/eventService";
import {DomService} from "c/domService";
import {AuthorizationService} from "c/authorizationService";

import {validate} from "./validate";

//TODO - очистить все поля после регистрации

export default class Registration extends LightningElement {
    @track user = {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email: '',
        mobilePhone: ''
    };
    repeatPassword = '';
    singUpButtonDisabled = true;

    valueHandler(event) {
        validate.parent = this;
        validate.parsingInput(event);
        this.singUpButtonDisabled = !validate.isValidData();
    }

    async signUp(event) {
        EventService.spinnerEvt(true, this);
        if (!await validate.isAvailableEmail()) {
            EventService.showToastEvt('Oh...', 'Email is not available', 'warning', this);
            EventService.spinnerEvt(false, this);
            return false;
        }

        const createdUserId = AuthorizationService.signUp(this.user);
        if (createdUserId) {
            EventService.showToastEvt('Success', 'Account was created!', 'success', this);
            EventService.loginEvt(createdUserId, this);
        }
        EventService.spinnerEvt(false, this);
    }
}