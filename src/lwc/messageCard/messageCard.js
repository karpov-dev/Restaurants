import {LightningElement, api} from 'lwc';
import {CssVisibilityService} from "c/cssVisibilityService";

const HIDE_CLASS = 'hide';
const SHOW_CLASS = 'show';

export default class MessageCard extends LightningElement {
    @api message;
    @api iconName;
    cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);

    @api show(message, icon) {
        this.message = message;
        this.iconName = icon;
        this.cssVisibilityHelper.show('message');
    }

    @api hide() {
        this.cssVisibilityHelper.hide('message');
    }
}