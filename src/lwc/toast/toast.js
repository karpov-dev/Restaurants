import {LightningElement, api} from 'lwc';

//TODO - Добавить Title

export default class MiscNotification extends LightningElement {
    @api title = 'Title';
    @api message = 'Message';
    @api variant = 'success';
    @api autoCloseTime = 5000;
    @api autoClose;
    timerId;

    @api setData(title, message, variant, autoClose = true) {
        this.title = title
        this.message = message;
        this.variant = variant;
        this.autoClose = autoClose;
    }

    @api show() {
        this.close();

        const toastModel = this.template.querySelector('[data-id="toastModal"]');
        toastModel.className = 'show';

        if (this.autoClose) this.autoCloseToast();
    }

    @api close() {
        if (this.timerId) clearTimeout(this.timerId);

        const toastModel = this.template.querySelector('[data-id="toastModal"]');
        toastModel.className = 'hide';
    }

    autoCloseToast() {
        this.timerId = setTimeout(() => {
             this.close();
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