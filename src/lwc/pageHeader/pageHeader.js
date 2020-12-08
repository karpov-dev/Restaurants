import {LightningElement, api} from 'lwc';
import {DomService} from "c/domService";
import {EventService} from "c/eventService";

export default class PageHeader extends LightningElement {
    @api userId;

    openAuthModal() {
        EventService.openLoginModal(this);
    }

    get isUserMode() {
        return !!this.userId;
    }

    get getUserId() {
        return this.userId;
    }
}