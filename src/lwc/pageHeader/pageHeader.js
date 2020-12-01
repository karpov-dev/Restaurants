import {LightningElement, api} from 'lwc';
import {DomService} from "c/domService";
import {EventService} from "c/eventService";

export default class PageHeader extends LightningElement {
    @api userId;
    modalWindow;

    renderedCallback() {
        this.modalWindow = DomService.getElementByTag('c-modal-window', this);
    }

    openAuthModal() {
        this.modalWindow.show();
    }

    closeAuthModal() {
        this.modalWindow.hide();
    }

    get isUserMode() {
        return !!this.userId;
    }

    get getUserId() {
        return this.userId;
    }
}