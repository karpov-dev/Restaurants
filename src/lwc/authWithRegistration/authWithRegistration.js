import {LightningElement} from 'lwc';
import {DomService} from "c/domService";

export default class AuthWithRegistration extends LightningElement {
    showRegistration() {
        DomService.changeElementClass('authorization', 'slds-hide', this);
        DomService.changeElementClass('registration', 'slds-show', this);
    }

    showAuthorization() {
        DomService.changeElementClass('authorization', 'slds-show', this);
        DomService.changeElementClass('registration', 'slds-hide', this);
    }
}