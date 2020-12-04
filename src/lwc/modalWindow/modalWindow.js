import {LightningElement, api} from 'lwc';
import {CssVisibilityService} from "c/cssVisibilityService";

const SHOW_CLASS = 'slds-show';
const HIDE_CLASS = 'slds-hide';

export default class ModalWindow extends LightningElement {
    cssVisibilityHelper;

    constructor() {
        super();
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);
    }

    @api show() {
        this.cssVisibilityHelper.show('modal')
    }

    @api hide() {
        this.cssVisibilityHelper.hide('modal');
    }
}