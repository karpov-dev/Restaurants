import {LightningElement, api} from 'lwc';
import {DomService} from "c/domService";

export default class UserBox extends LightningElement {
    @api
    get userId() {return this.currentUserId}
    set userId(value) {this.currentUserId = value}

    currentUserId;

    @api refresh() {
        const tables = DomService.getAllElementsByTag('c-active-orders-table', this);

        for (let i = 0; i < tables.length; i++) {
            tables[i].refreshOrders(null);
        }
    }
}