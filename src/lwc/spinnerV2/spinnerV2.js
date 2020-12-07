import {api, LightningElement} from 'lwc';
import {CssVisibilityService} from "c/cssVisibilityService";

const SHOW_CLASS = 'show';
const HIDE_CLASS = 'hide';

export default class SpinnerV2 extends LightningElement {
    cssVisibilityHelper;

    constructor() {
        super();
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);
    }

    @api show() {
        this.cssVisibilityHelper.show('spinner');
    }

    @api hide() {
        this.cssVisibilityHelper.hide('spinner');
    }
}