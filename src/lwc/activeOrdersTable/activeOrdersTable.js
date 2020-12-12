import {api, track, LightningElement} from 'lwc';
import {Filters} from "c/filters";
import {loaders} from "./loaders";
import {Utility} from "c/utility";
import {EventService} from "c/eventService";
import {DomService} from "c/domService";

export default class ActiveOrdersTable extends LightningElement {
    @api
    get userId() {return this.currentUserId}
    set userId(value) {
        this.currentUserId = value;
        this.getActiveOrders();
    }

    @api
    refreshOrders(event) {
        loaders.loadActiveOrders(this.filterManager.getFilters, this);
    }

    @api stageName;

    currentUserId;
    filterManager = new Filters();
    @track activeOrders = [];

    constructor() {
        super();

        EventService.addEventListner(this, EventService.EVENT_NAMES.orderWasDeleted, this.refreshOrders);
    }

    orderIsLoaded(loadedOrders) {
        for (let i = 0; i < loadedOrders.length; i++) {
            const order = loadedOrders[i];
            order.Start_Rent__c = Utility.toStringDateTime(new Date(order.Start_Rent__c));
            order.End_Rent__c = Utility.toStringDateTime(new Date(order.End_Rent__c));
        }

        const messageCard = DomService.getElementByTag('c-message-card', this);
        if (loadedOrders.length === 0) messageCard.show('Orders not found', 'standard:unmatched');
        else messageCard.hide();

        this.activeOrders = loadedOrders;
    }

    getActiveOrders() {
        if (!this.currentUserId) return null;

        this.initFilters();
        loaders.loadActiveOrders(this.filterManager.getFilters, this);
    }

    initFilters() {
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
            this.stageName,
            Filters.OPERATORS.EQUAL,
            Filters.SUBTYPE.EXPRESSION);

        const orderByFilter = Filters.createSpecifyFilter(Filters.OPERATORS.ORDER_BY, 'CreatedDate', Filters.ADDITIONAL_OPERATOR.ASC);

        this.filterManager.upsert(orderByFilter);
        this.filterManager.upsert(userIdFilter);
        this.filterManager.upsert(activeOrderFilter);
    }
}