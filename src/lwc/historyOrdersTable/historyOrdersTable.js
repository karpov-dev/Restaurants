import {api, LightningElement} from 'lwc';

export default class HistoryOrdersTable extends LightningElement {
    @api
    get userId() {return this.currentUserId}
    set userId(value) {this.currentUserId = value}

    currentUserId;
}