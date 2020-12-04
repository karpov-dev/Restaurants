import {LightningElement, api} from 'lwc';
import {CssVisibilityService} from "c/cssVisibilityService";

const SHOW_CLASS_NAME = 'show-from-left';
const HIDE_CLASS_NAME = 'hide-to-right';
const DEFAULT_TIMEOUT = 3000;

export default class MiscNotification extends LightningElement {
    @api title = 'Title';
    @api message = 'Message';
    @api variant = 'success';
    @api autoCloseTime = DEFAULT_TIMEOUT;
    @api autoClose;
    timerId;
    cssVisibilityHelper;

    @api setData(title, message, variant, autoClose = true) {
        this.title = title
        this.message = message;
        this.variant = variant;
        this.autoClose = autoClose;
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS_NAME, HIDE_CLASS_NAME);
    }

    @api show() {
        this.hide();
        this.cssVisibilityHelper.show('toast');
        if (this.autoClose) this.autoCloseToast();
    }

    @api hide() {
        if (this.timerId) clearTimeout(this.timerId);
        this.cssVisibilityHelper.hide('toast');
    }

    autoCloseToast() {
        this.timerId = setTimeout(() => {
             this.hide();
        }, this.autoCloseTime);
    }

    get mainDivClass() {
        return 'slds-notify slds-notify_toast slds-theme_' + this.variant;
    }

    get messageDivClass() {
        return 'slds-icon_container slds-icon-utility-' + this.variant + ' slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top';
    }

    get iconName() {
        return 'utility:' + this.variant;
    }
}