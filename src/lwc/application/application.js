import {LightningElement} from 'lwc';

import serverHasErrorLabel from '@salesforce/label/c.Server_has_Error';
import serverHasErrorMessage from '@salesforce/label/c.Server_has_error_message';

import {EventService} from "c/eventService";
import {helper} from "./helper";
import {DomService} from "c/domService";

export default class MainComponentManager extends LightningElement {
    userId;

    constructor() {
        super();
        helper.parent = this;
        EventService.addEventListner(this, EventService.EVENT_NAMES.showToastEvt, this.setToast);
        EventService.addEventListner(this, EventService.EVENT_NAMES.serverErrorEvt, this.showServerError);
        EventService.addEventListner(this, EventService.EVENT_NAMES.spinnerEvt, this.showSpinner);
        EventService.addEventListner(this, EventService.EVENT_NAMES.loginEvt, this.loginUser);
        EventService.addEventListner(this, EventService.EVENT_NAMES.logout, this.logoutUser);
    }

    setToast(event) {
        helper.showToast(event.detail.title, event.detail.message, event.detail.variant);
    }

    showServerError(event) {
        helper.showToast(serverHasErrorLabel, serverHasErrorMessage, 'error');
    }

    showSpinner(event) {
        helper.showSpinner(event.detail);
    }

    loginUser(event) {
        this.userId = event.detail;
        helper.changePage('restaurants');
    }

    logoutUser(event) {
        this.userId = null;
    }
}