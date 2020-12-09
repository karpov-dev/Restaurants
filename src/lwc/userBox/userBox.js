import {LightningElement, api} from 'lwc';

export default class UserBox extends LightningElement {
    @api
    get userId() {return this.currentUserId}
    set userId(value) {this.currentUserId = value}

    currentUserId;
}