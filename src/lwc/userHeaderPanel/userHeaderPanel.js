import {LightningElement, api} from 'lwc';
import {EventService} from "c/eventService";

export default class UserHeaderPanel extends LightningElement {
    @api userId

    logout(event) {
        EventService.logoutEvt(this);
    }

    openUserBox(event) {
        EventService.openUserBoxEvt(this);
    }
}