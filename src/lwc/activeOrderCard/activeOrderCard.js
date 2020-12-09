import {api, LightningElement} from 'lwc';

export default class ActiveOrderCard extends LightningElement {
    @api order;
    get orderItem() {return order}
    set orderItem(value) {

    }

    parsingDates() {

    }
}