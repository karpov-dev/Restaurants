import {LightningElement, api} from 'lwc';
import {CssVisibilityService} from "c/cssVisibilityService";

const SHOW_CLASS = 'show';
const HIDE_CLASS = 'hide';

export default class Spinner extends LightningElement {
    cssVisibilityHelper;

    constructor() {
        super();
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);
    }

    @api showSpinner(spinnerState) {
        if (spinnerState) this.cssVisibilityHelper.show('spinner');
        else this.cssVisibilityHelper.hide('spinner');
    }
}