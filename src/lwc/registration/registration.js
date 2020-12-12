import {LightningElement, track, api} from 'lwc';

import {EventService} from "c/eventService";
import {AuthorizationService} from "c/authorizationService";
import {CssVisibilityService} from "c/cssVisibilityService";

import {validate} from "./validate";

const SHOW_CLASS = 'slds-show';
const HIDE_CLASS = 'slds-hide';

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
    visibilityHelper;

    constructor() {
        super();
        this.visibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);

    }

    @api show() {
        this.visibilityHelper.show('registration');
    }

    @api hide() {
        this.visibilityHelper.hide('registration');
    }

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

        const createdUserId = await AuthorizationService.signUp(this.user, this);
        if (createdUserId) {
            EventService.showToastEvt('Success', 'Account was created!', 'success', this);
            EventService.loginEvt(createdUserId, this);
        }

        EventService.spinnerEvt(false, this);
    }
}