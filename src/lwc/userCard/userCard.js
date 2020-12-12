import {api, track, LightningElement} from 'lwc';
import {loaders} from "./loaders";

export default class UserCard extends LightningElement {
    @api
    get userId() {return this.currentUserId}
    set userId(value) {
        this.currentUserId = value
        if (this.currentUserId) loaders.loadUser(this.currentUserId, this);
    }

    currentUserId;
    @track user = {Id: '', FirstName: '', LastName: '', Email: '', Username__c: '', Phone: ''};

    userIsLoaded(loadedUser) {
        this.user = loadedUser;
    }
}