import {api, track, LightningElement} from 'lwc';
import {Filters} from "c/filters";
import {loaders} from "./loaders";

export default class ActiveOrdersTable extends LightningElement {
    @api
    get userId() {return this.currentUserId}
    set userId(value) {
        this.currentUserId = value;
        this.getActiveOrders();
    }

    currentUserId;
    filterManager = new Filters();
    @track activeOrders = [];

    getActiveOrders() {
        if (!this.currentUserId) return null;

        const userIdFilter = Filters.create(
            'UserIdOrders',
            Filters.TYPES.STRING_TYPE,
            'Contact__c',
            this.currentUserId,
            Filters.OPERATORS.EQUAL,
            Filters.SUBTYPE.EXPRESSION);

        const activeOrderFilter = Filters.create(
            'ActiveOrders',
            Filters.TYPES.STRING_TYPE,
            'StageName',
            'Open Rent',
            Filters.OPERATORS.EQUAL,
            Filters.SUBTYPE.EXPRESSION);

        this.filterManager.upsert(userIdFilter);
        this.filterManager.upsert(activeOrderFilter);

        loaders.loadActiveOrders(this.filterManager.getFilters, this);
    }
}