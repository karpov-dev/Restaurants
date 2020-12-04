import {LightningElement} from 'lwc';
import {DomService} from "c/domService";

export default class AuthWithRegistration extends LightningElement {
    authCmp;
    regCmp;

    renderedCallback() {
        this.authCmp = DomService.getElementByTag('c-authorization', this);
        this.regCmp = DomService.getElementByTag('c-registration', this);

        this.authCmp.show();
    }

    showRegistration() {
        this.authCmp.hide();
        this.regCmp.show();
    }

    showAuthorization() {
        this.authCmp.show();
        this.regCmp.hide();
    }
}